import fs from "node:fs";
import hre from "hardhat";
import { NFTStorage } from "nft.storage";

const NFT_STORAGE_API_KEY = process.env.NFT_STORAGE_API_KEY;
const nftStorage = new NFTStorage({ token: NFT_STORAGE_API_KEY });

export async function verifyContract(contractAddress, brandName) {
  console.log("Verifying contract...");
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: [brandName],
      contract: "contracts/VeilBrand.sol:VeilBrand"
    });
    console.log("Contract successfully verified on Basescan!");
  } catch (error) {
    console.error("Error verifying contract:", error.message);
    console.log("You can try manual verification with:");
    console.log(`npx hardhat verify --network baseSepolia ${contractAddress} "${brandName}"`);
  }
}

export async function deployTokenContract(brandName) {
  console.log(`Deploying ${brandName} contract to Base Sepolia...`);
  const VeilBrand = await hre.ethers.getContractFactory("VeilBrand");
  const brandContract = await VeilBrand.deploy(brandName);
  await brandContract.waitForDeployment();
  const contractAddress = await brandContract.getAddress();
  console.log(`${brandName} Contract deployed to: ${contractAddress}`);
  const deploymentTime = new Date();
  const [signer] = await hre.ethers.getSigners();
  const deploymentInfo = {
    brandName: brandName,
    signer: await signer.getAddress(),
    deployedAt: deploymentTime.toISOString(),
    address: contractAddress,
    network: hre.network.name,
    basescanUrl: `https://sepolia.basescan.com/address/${contractAddress}`,
  };
  const deploymentFilePath = `${brandName.toLowerCase()}-deployment.json`;
  fs.writeFileSync(deploymentFilePath, JSON.stringify(deploymentInfo, null, 2));
  console.log(`Deployment information saved to ${deploymentFilePath}`);
  console.log(`Waiting 30s before verification...`);
  await new Promise(resolve => setTimeout(resolve, 30000));
  verifyContract(contractAddress, brandName);
  return deploymentInfo;
}

export async function uploadMetadataToIPFS(
  name,
  description,
  imageUri,
  brand,
  type,
) {
  console.log(`Uploading metadata for ${name} to IPFS...`);
  const metadata = {
    name: name,
    description: description,
    image: imageUri,
    properties: {
      brand: brand,
      type: type || 'Luxury Item'
    }
  };
  const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
  const cid = await nftStorage.storeBlob(metadataBlob);
  const metadataUri = `ipfs://${cid}`;
  console.log(`Metadata uploaded successfully: ${metadataUri}`);
  return metadataUri;
}

export async function createToken(
  brandContract,
  id,
  tokenName,
  supplyLimit,
  metadataUri
) {
  console.log(`Creating token type "${tokenName}" with ID ${id}...`);
  const tx = await brandContract.createToken(id, tokenName, supplyLimit, metadataUri);
  await tx.wait();
  console.log(`Successfully created token type: ${tokenName} (ID: ${id})`);
  return id;
}

export async function mintToken(
  brandContract,
  to,
  id,
  amount,
  data = "0x"
) {
  console.log(`Minting ${amount} of token ID ${id}...`);
  const tx = await brandContract.mint(to, id, amount, data);
  await tx.wait();
  console.log(`Successfully minted ${amount} of token ID ${id} to ${to}`);
}
