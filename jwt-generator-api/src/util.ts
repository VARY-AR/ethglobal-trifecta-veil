import jwt from 'jsonwebtoken';
import crypto from "crypto";
import { Token, TokenOwnership } from './types';
import { ethers, Contract } from 'ethers';

const ERC1155_ABI = [
  'function balanceOf(address account, uint256 id) view returns (uint256)',
  'function uri(uint256 id) view returns (string)'
];

const KNOWN_CONTRACTS = [
  { address: '0x7b96EAe24193302a31ce1FcF414aB76fF9D10D83', brand: 'Prada' },
  { address: '0xEDBB9ea80cf07CEa5dEe7E135fCFd6ae50b1A2c8', brand: 'Gucci' },
  { address: '0x2FF69e6d72a371eE03C77A0A62fed49A5b5480A8', brand: 'Burberry' }
];

export const _getSigningString = (tokens: Token[]): string => {
  const sortedTokens = [...tokens].sort((token1: Token, token2: Token) => {
    const addressComparison = token1.contractAddress.toLowerCase().localeCompare(token2.contractAddress.toLowerCase());
    if (addressComparison !== 0) return addressComparison;
    const tokenIdComparison = token1.tokenId.localeCompare(token2.tokenId);
    if (tokenIdComparison !== 0) return tokenIdComparison;
    return token1.count - token2.count;
  });
  return JSON.stringify(sortedTokens);
}

export const verifySignatureAndGetAddress = async (message: string, signature: string): Promise<string> => {
  try {
    const signerAddress = ethers.verifyMessage(message, signature);
    return signerAddress;
  } catch (error) {
    console.error('Error verifying signature:', error);
    throw new Error('Invalid signature');
  }
};

export const verifyTokenOwnership = async (web3Provider: ethers.JsonRpcProvider, token: Token, ownerAddress: string): Promise<boolean> => {
  try {
    const contract = new ethers.Contract(token.contractAddress, ERC1155_ABI, web3Provider);
    const balance = await contract.balanceOf(ownerAddress, token.tokenId);
    return balance >= token.count;
  } catch (error) {
    console.error(`Error verifying ownership for token ${token.tokenId} at ${token.contractAddress}:`, error);
    return false;
  }
};

export const fetchTokenMetadata = async (web3Provider: ethers.JsonRpcProvider, token: Token): Promise<any> => {
  try {
    const contract = new ethers.Contract(token.contractAddress, ERC1155_ABI, web3Provider);
    let tokenURI = await contract.uri(token.tokenId);
    if (tokenURI.startsWith('data:application/json;base64,')) {
      const base64Data = tokenURI.replace('data:application/json;base64,', '');
      const jsonString = Buffer.from(base64Data, 'base64').toString('utf8');
      return JSON.parse(jsonString);
    }
    if (tokenURI.startsWith('data:application/json,')) {
      const jsonString = decodeURIComponent(tokenURI.replace('data:application/json,', ''));
      return JSON.parse(jsonString);
    }
    const url = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/');
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching metadata for token ${token.tokenId} at ${token.contractAddress}:`, error);
    return null;
  }
};

export const generateTokenJWT = (token: Token, ownerAddress: string, metadata: any, privateKeyPem: string): string => {
  const payload = {
    contractAddress: token.contractAddress,
    tokenId: token.tokenId,
    count: token.count,
    owner: ownerAddress,
    metadata,
    iss: "https://veil.veil",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 3), // 3 minutes
    product: {
      "name": metadata.name,
      "productionDate": metadata.productionDate,
      "unitPrice": metadata.unitPrice,
      "serialNumber": null,
      "recyclabilityPercentage": null,
    },
  };
  const privateKey = crypto.createPrivateKey({
    key: privateKeyPem,
    type: "pkcs8",
    format: "pem",
  });
  return jwt.sign(payload, privateKey, {algorithm: "RS256"});
};

export async function retrieveOwnedTokens(provider: ethers.JsonRpcProvider, walletAddress: string): Promise<TokenOwnership[]> {
  const ownedTokens: TokenOwnership[] = [];
  for (const contract of KNOWN_CONTRACTS) {
    const tokenContract = new Contract(contract.address, ERC1155_ABI, provider);
    for (let tokenId = 1; tokenId <= 10; tokenId++) {
      try {
        const balance = await tokenContract.balanceOf(walletAddress, tokenId);

        if (balance > 0) {
          let metadata = null;
          try {
            const uri = await tokenContract.uri(tokenId);
            if (uri.startsWith('data:application/json;base64,')) {
              const base64Data = uri.replace('data:application/json;base64,', '');
              const jsonString = Buffer.from(base64Data, 'base64').toString();
              metadata = JSON.parse(jsonString);
            }
          } catch (error) {
            console.error(`Error fetching metadata for token ${tokenId} at ${contract.address}:`, error);
          }
          ownedTokens.push({
            contractAddress: contract.address,
            tokenId: tokenId.toString(),
            balance: balance.toString(),
            metadata,
            brand: contract.brand
          });
        }
      } catch (error) {
        console.error(`Error checking token ${tokenId} balance at ${contract.address}:`, error);
      }
    }
  }
  return ownedTokens;
}
