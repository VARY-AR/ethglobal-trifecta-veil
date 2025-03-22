import fs from "fs";
import hre from "hardhat";
import { deployTokenContract, generateDataURI, createToken, mintToken } from "./run-util.js";

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
  return await deployTokenContract(brandName);
}

// Define luxury items for each brand
const brandItems = {
  Prada: [
    {
      name: "Leather Handbag",
      description: "Premium Italian leather handbag",
      imageUri: "https://img.stylemi.co/unsafe/fit-in/520x650/filters:fill(fff)/products/farfetch/36051869-prada-medium-galleria-saffiano-leather-tote-bag.jpg",
      type: "Handbag",
      supplyLimit: 100
    }
  ],
  Gucci: [
    {
      name: "Designer Belt",
      description: "Signature GG buckle belt",
      imageUri: "https://imgs.search.brave.com/D2ho4AFxEhyeRoTun_3XHb3m_WWO4pwSQ6fuH_nsdIU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pNS53/YWxtYXJ0aW1hZ2Vz/LmNvbS9zZW8vR3Vj/Y2ktU3R1ZGRlZC1s/ZWF0aGVyLWJlbHQt/bWV0YWwtYm93LWhp/YmlzY3VzLXJlZC1i/bGFjay1CZWx0LU1v/b24tUGVhcmwtSXRh/bHktTmV3XzkwZWYz/NTQ5LTA5ZDUtNDJj/ZS1hMGYwLTE1NGMz/OWY5N2U1ZV8xLmU3/YjhhMDRhNzEwMTA2/MGFlOWRjNjE4MDA2/ZDIxOTk4LmpwZWc_/b2RuSGVpZ2h0PTc4/NCZvZG5XaWR0aD01/ODAmb2RuQmc9RkZG/RkZG",
      type: "Belt",
      supplyLimit: 150
    }
  ],
  Burberry: [
    {
      name: "Classic Trench Coat",
      description: "Iconic Burberry trench coat",
      imageUri: "https://imgs.search.brave.com/Qrvd2-CGbPwqiNcw70XCh0cOIlnOC7SreUsBYHJ_hBA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bW9zLmNtcy5mdXR1/cmVjZG4ubmV0L3do/b3doYXR3ZWFyL3Bv/c3RzLzI4MTg1Ni9i/ZXN0LWJ1cmJlcnJ5/LXRyZW5jaC1jb2F0/LXdvbWVuLTI4MTg1/Ni0xNjc5Njc3NDA0/MTYzLW1haW4tMzIw/LTgwLmpwZw",
      type: "Coat",
      supplyLimit: 50
    }
  ]
};

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
      item.brandDeployment = brandDeployment.brandName;
      const metadataUri = await generateDataURI(
        item.name,
        item.description,
        item.imageUri,
        item.brand,
        item.type
      );
      const tokenId = i + 1;
      await createToken(
        brandDeployment.contract,
        tokenId,
        item.name,
        item.supplyLimit,
        metadataUri,
      );
      await mintToken(
        brandDeployment.contract,
        signerAddress,
        tokenId,
        1,
      );
    }
  }

  console.log("\nAll token creations and minting completed successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
