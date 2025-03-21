// src/deploy.mjs
import { getInitialTestAccountsWallets } from '@aztec/accounts/testing';
import { Contract, createPXEClient, loadContractArtifact, waitForPXE } from '@aztec/aztec.js';
import VeilContractJson from "../target/veil-Veil.json" assert { type: "json" };

const VeilContractArtifact = loadContractArtifact(VeilContractJson);

const { PXE_URL = 'http://localhost:8080' } = process.env;

async function main() {
  const pxe = createPXEClient(PXE_URL);
  await waitForPXE(pxe);

  const [ownerWallet] = await getInitialTestAccountsWallets(pxe);
  const ownerAddress = ownerWallet.getAddress();

  const veil = await Contract.deploy(ownerWallet, VeilContractArtifact, [18, ownerAddress])
    .send()
    .deployed();

  console.log(`Veil deployed at ${veil.address.toString()}`);

  const balance = await veil.methods.get_counter(ownerAddress).simulate();
  console.log(balance);
}

main().catch((err) => {
  console.error(`Error in deployment script: ${err}`);
  process.exit(1);
});

