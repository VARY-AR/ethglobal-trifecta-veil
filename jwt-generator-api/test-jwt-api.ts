import { ethers } from 'ethers';
import axios from 'axios';
import fs from 'fs';

const API_URL = 'http://localhost:3000';
const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;
if (!PRIVATE_KEY) {
  console.error('Error: DEPLOYER_PRIVATE_KEY environment variable is required');
  process.exit(1);
}

// Token data to request JWTs for
const tokens = [
  {
    contractAddress: '0x090AE03364aBFB375998b4B043d7A789f57cFEca',
    tokenId: '1',
    count: 1
  },
  {
    contractAddress: '0x77BD077fFFe51EdFC4913Ee50506a3e59063bbEa',
    tokenId: '1',
    count: 1
  },
  {
    contractAddress: '0x14433bD6a97C09EB2759DF22CEC6bF0d216DF2f5',
    tokenId: '1',
    count: 2
  }
];

const wallet = new ethers.Wallet(PRIVATE_KEY);
async function testJwtGenerator() {
  try {
    console.log('Testing JWT Generator API...');
    console.log(`Using wallet address: ${wallet.address}`);

    // Step 1: Get signing string
    console.log('\n1. Requesting signing string...');
    const signingResponse = await axios.post(`${API_URL}/generate-signing-string`, {
      tokens
    });

    const { signingString } = signingResponse.data;
    console.log(`Signing string received: ${signingString}`);

    // Step 2: Sign the string
    console.log('\n2. Signing the string with wallet...');
    const signature = await wallet.signMessage(signingString);
    console.log(`Signature: ${signature}`);

    // Step 3: Request JWTs
    console.log('\n3. Requesting JWTs with signature...');
    const jwtResponse = await axios.post(`${API_URL}/generate-jwts`, {
      tokens,
      signature
    });

    // Step 4: Display results
    console.log('\n4. Results:');

    if (jwtResponse.data.error) {
      console.error(`Error: ${jwtResponse.data.error}`);
    } else {
      console.log(`Received ${jwtResponse.data.jwts.length} JWTs`);

      // Save JWTs to file for inspection
      const outputFile = './jwt-results.json';
      fs.writeFileSync(outputFile, JSON.stringify(jwtResponse.data, null, 2));
      console.log(`Results saved to ${outputFile}`);

      // Display first JWT
      if (jwtResponse.data.jwts.length > 0) {
        console.log('\nFirst JWT details:');
        console.log(`Contract: ${jwtResponse.data.jwts[0].token.contractAddress}`);
        console.log(`Token ID: ${jwtResponse.data.jwts[0].token.tokenId}`);
        console.log(`JWT: ${jwtResponse.data.jwts[0].jwt.substring(0, 50)}...`);
      }
    }
  } catch (error) {
    console.error('Error occurred:');
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
    } else {
      console.error(error);
    }
  }
}

// Run the test
testJwtGenerator().catch(console.error);
