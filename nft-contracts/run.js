import fs from "node:fs";
import hre from "hardhat";
import { deployTokenContract, generateDataURI, createToken, mintToken } from "./run-util.js";
import brandItems from "./brand-items.json" with { "type": "json" };

async function getDeployment(brandName) {
  const deploymentFilePath = `deployment-${brandName.toLowerCase()}.json`;
  try {
    if (fs.existsSync(deploymentFilePath)) {
      console.log(`Found existing deployment for ${brandName}`);
      return JSON.parse(fs.readFileSync(deploymentFilePath, 'utf8'));
    }
  } catch (error) {
    console.error(`Error loading deployment for ${brandName}:`, error.message);
  }
  const deploymentInfo = await deployTokenContract(brandName);
  deploymentInfo.tokens = [];
  fs.writeFileSync(deploymentFilePath, JSON.stringify(deploymentInfo, null, 2));
  console.log(`Deployment information saved to ${deploymentFilePath}`);
  return deploymentInfo;
}

async function updateDeploymentFile(deployment) {
  const deploymentFilePath = `deployment-${deployment.brandName.toLowerCase()}.json`;
  // Create a copy without the contract property before saving
  const deploymentCopy = {...deployment};
  delete deploymentCopy.contract;
  fs.writeFileSync(deploymentFilePath, JSON.stringify(deploymentCopy, null, 2));
  console.log(`Updated deployment information in ${deploymentFilePath}`);
}

async function main() {
  console.log("Starting luxury brand contracts deployment and minting items...");
  const VeilBrand = await hre.ethers.getContractFactory("VeilBrand");
  const [signer] = await hre.ethers.getSigners();
  const signerAddress = await signer.getAddress();
  const brandDeployments = [];
  for (const brandName of ["Prada", "Gucci", "Burberry"]) {
    const deployment = await getDeployment(brandName);
    const brandContract = VeilBrand.attach(deployment.address);
    brandDeployments.push({ ...deployment, contract: brandContract });
  }

  for (const brandDeployment of brandDeployments) {
    console.log(`\nProcessing items for ${brandDeployment.brandName}...`);
    const items = brandItems[brandDeployment.brandName];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const tokenId = i + 1;
      let existingToken = brandDeployment.tokens.find(t => t.id === tokenId);
      if (!existingToken) {
        console.log(`Creating token #${tokenId} - ${item.name}...`);
        const metadataUri = await generateDataURI(
          item.name,
          item.description,
          item.imageUri,
          item.brand,
          item.type
        );
        await createToken(
          brandDeployment.contract,
          tokenId,
          item.name,
          item.supplyLimit,
          metadataUri,
        );
        const tokenData = {
          id: tokenId,
          name: item.name,
          description: item.description,
          imageUri: item.imageUri,
          type: item.type,
          supplyLimit: item.supplyLimit,
          unitPrice: item.unitPrice,
          metadataUri: metadataUri,
          brand: brandDeployment.brandName,
          contractAddress: brandDeployment.address,
          network: brandDeployment.network || "baseSepolia",
          createdAt: new Date().toISOString()
        };
        brandDeployment.tokens.push(tokenData);
        await updateDeploymentFile(brandDeployment);
        console.log(`Token creation data saved to deployment file`);
        existingToken = tokenData;
      } else {
        console.log(`Token #${tokenId} already exists, skipping creation...`);
      }

      if (!existingToken.minting) {
        console.log(`Minting token #${tokenId} to ${signerAddress}...`);
        await mintToken(
          brandDeployment.contract,
          signerAddress,
          tokenId,
          1,
        );
        const tokenIndex = brandDeployment.tokens.findIndex(t => t.id === tokenId);
        brandDeployment.tokens[tokenIndex].minting = {
          mintedTo: signerAddress,
          amount: 1,
          mintedAt: new Date().toISOString(),
        };
        brandDeployment.tokens[tokenIndex].lastUpdated = new Date().toISOString();
        await updateDeploymentFile(brandDeployment);
        console.log(`Token minting data updated in deployment file`);
      }
    }
  }

  console.log("\nAll token creations and minting completed successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
