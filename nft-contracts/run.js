import hre from "hardhat";
import { deployTokenContract, uploadMetadataToIPFS, createToken, mintToken } from "./run-util.js";


// Define luxury items for each brand
const brandItems = {
  Prada: [
    {
      name: "Leather Handbag",
      description: "Premium Italian leather handbag",
      imageUri: "ipfs://QmPradaBagPlaceholder", // Replace with actual image IPFS URI
      type: "Handbag",
      supplyLimit: 100
    }
  ],
  Gucci: [
    {
      name: "Designer Belt",
      description: "Signature GG buckle belt",
      imageUri: "ipfs://QmGucciBeltPlaceholder", // Replace with actual image IPFS URI
      type: "Belt",
      supplyLimit: 150
    }
  ],
  Burberry: [
    {
      name: "Classic Trench Coat",
      description: "Iconic Burberry trench coat",
      imageUri: "ipfs://QmBurberryCoatPlaceholder", // Replace with actual image IPFS URI
      type: "Coat",
      supplyLimit: 50
    }
  ]
};

async function main() {
  console.log("Starting deployment of luxury brand contracts and minting items...");
  const [signer] = await hre.ethers.getSigners();
  const signerAddress = await signer.getAddress();
  const brands = [];
  for (const brandName of ["Prada", "Gucci", "Burberry"]) {
    const deployment = await deployTokenContract(brandName);
    const VeilBrand = await hre.ethers.getContractFactory("VeilBrand");
    const brandContract = VeilBrand.attach(deployment.address);
    brands.push({ ...deployment, contract: brandContract });
  }

  // Create and mint tokens for each brand
  for (const brand of brands) {
    console.log(`\nProcessing items for ${brand.brandName}...`);
    const items = brandItems[brand.brandName];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      item.brand = brand.brandName;
      const metadataUri = await uploadMetadataToIPFS(item);
      const tokenId = i + 1;
      await createToken(
        brand.contract,
        tokenId,
        item.name,
        item.supplyLimit,
        metadataUri
      );
      await mintToken(
        brand.contract,
        signerAddress,
        tokenId,
        1
      );
    }
  }

  console.log("\nAll deployments, token creations, and minting completed successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
