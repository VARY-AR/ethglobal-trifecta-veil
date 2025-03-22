import readline from 'readline';
import { deployTokenContract } from "./run-util.js";


async function runDeployTokenContract() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const brandName = new Promise(resolve => {
    rl.question('Enter a name for the brand contract: ', (name) => {
      rl.close();
      resolve(name);
    });
  });
  deployTokenContract(brandName);
}

runDeployTokenContract().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
