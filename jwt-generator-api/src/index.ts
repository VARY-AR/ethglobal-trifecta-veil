import express, { Request, Response } from 'express';
import cors from 'cors';
import { GetSigningStringRequest, GetSigningStringResponse, Token, GenerateJWTsRequest, GenerateJWTsResponse } from './types';
import { ethers } from 'ethers';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const BASE_SEPOLIA_RPC_URL = process.env.BASE_SEPOLIA_RPC_URL || 'https://sepolia.base.org';

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Ethereum provider
const provider = new ethers.JsonRpcProvider(BASE_SEPOLIA_RPC_URL);

// ERC1155 interface for ownership verification
const ERC1155_ABI = [
  'function balanceOf(address account, uint256 id) view returns (uint256)',
  'function uri(uint256 id) view returns (string)'
];

const _getSigningString = (tokens: Token[]): string => {
  const sortedTokens = [...tokens].sort((token1: Token, token2: Token) => {
    const addressComparison = token1.contractAddress.toLowerCase().localeCompare(token2.contractAddress.toLowerCase());
    if (addressComparison !== 0) return addressComparison;
    const tokenIdComparison = token1.tokenId.localeCompare(token2.tokenId);
    if (tokenIdComparison !== 0) return tokenIdComparison;
    return token1.count - token2.count;
  });
  return JSON.stringify(sortedTokens);
}

const verifySignatureAndGetAddress = async (message: string, signature: string): Promise<string> => {
  try {
    const signerAddress = ethers.verifyMessage(message, signature);
    return signerAddress;
  } catch (error) {
    console.error('Error verifying signature:', error);
    throw new Error('Invalid signature');
  }
};

const verifyTokenOwnership = async (token: Token, ownerAddress: string): Promise<boolean> => {
  try {
    const contract = new ethers.Contract(token.contractAddress, ERC1155_ABI, provider);
    const balance = await contract.balanceOf(ownerAddress, token.tokenId);
    return balance >= token.count;
  } catch (error) {
    console.error(`Error verifying ownership for token ${token.tokenId} at ${token.contractAddress}:`, error);
    return false;
  }
};

const fetchTokenMetadata = async (token: Token): Promise<any> => {
  try {
    const contract = new ethers.Contract(token.contractAddress, ERC1155_ABI, provider);
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

const generateTokenJWT = (token: Token, ownerAddress: string, metadata: any): string => {
  const payload = {
    contractAddress: token.contractAddress,
    tokenId: token.tokenId,
    count: token.count,
    owner: ownerAddress,
    metadata,
    iss: "https://veil.veil.veil",
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

  return jwt.sign(payload, JWT_SECRET);
};

app.post('/generate-signing-string', (req: Request<{}, {}, GetSigningStringRequest>, res: Response): Response<GetSigningStringResponse> => {
  try {
    if (!req.body.tokens || !Array.isArray(req.body.tokens)) {
      return res.status(400).json({ error: 'Invalid tokens array' });
    }
    return res.json({ signingString: _getSigningString(req.body.tokens) });
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.post('/generate-jwts', async (req: Request<{}, {}, GenerateJWTsRequest>, res: Response): Promise<Response<GenerateJWTsResponse>> => {
  try {
    if (!req.body.tokens || !Array.isArray(req.body.tokens) || !req.body.signature) {
      return res.status(400).json({ jwts: [], error: 'Invalid request. Tokens array and signature are required.' });
    }
    const signingString = _getSigningString(req.body.tokens);
    const walletAddress = await verifySignatureAndGetAddress(signingString, req.body.signature);
    const ownershipChecks = await Promise.all(
      req.body.tokens.map(token => verifyTokenOwnership(token, walletAddress))
    );
    if (ownershipChecks.some(isOwner => !isOwner)) {
      return res.status(403).json({
        jwts: [],
        error: 'Access denied. You are not the owner of one or more requested tokens.'
      });
    }
    const results = await Promise.all(req.body.tokens.map(async (token) => {
      const metadata = await fetchTokenMetadata(token);
      const tokenJwt = generateTokenJWT(token, walletAddress, metadata);
      return { token, jwt: tokenJwt, metadata };
   }));
    return res.json({ jwts: results });
  } catch (error) {
    console.error('Error processing JWT generation:', error);
    return res.status(500).json({ jwts: [], error: 'Server error during JWT generation' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
