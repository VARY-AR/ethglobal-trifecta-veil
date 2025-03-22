import { ethers } from 'ethers';
import axios from 'axios';
import fs from 'fs';

const API_URL = 'http://localhost:3000';
const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;
if (!PRIVATE_KEY) {
  console.error('Error: DEPLOYER_PRIVATE_KEY environment variable is required');
  process.exit(1);
}

// Token data to request JWTs for (fallback if retrieval fails)
const tokens = [
  {
    contractAddress: '0x2FF69e6d72a371eE03C77A0A62fed49A5b5480A8',
    tokenId: '1',
    count: 1
  },
  {
    contractAddress: '0xEDBB9ea80cf07CEa5dEe7E135fCFd6ae50b1A2c8',
    tokenId: '1',
    count: 1
  },
  {
    contractAddress: '0x7b96EAe24193302a31ce1FcF414aB76fF9D10D83',
    tokenId: '1',
    count: 1
  }
];

const wallet = new ethers.Wallet(PRIVATE_KEY);
async function testJwtGenerator() {
  try {
    console.log('Testing JWT Generator API...');
    console.log(`Using wallet address: ${wallet.address}`);

    // Step 0: Retrieve owned tokens
    console.log('\n0. Retrieving tokens owned by wallet...');
    const retrieveResponse = await axios.post(`${API_URL}/retrieve-tokens`, {
      walletAddress: wallet.address
    });

    if (retrieveResponse.data.error) {
      console.error(`Error retrieving tokens: ${retrieveResponse.data.error}`);
    } else {
      console.log(`Found ${retrieveResponse.data.tokens.length} tokens owned by wallet`);

      if (retrieveResponse.data.tokens.length > 0) {
        console.log('\nToken ownership details:');
        retrieveResponse.data.tokens.forEach((token, index) => {
          console.log(`\nToken #${index + 1}:`);
          console.log(`  Contract: ${token.contractAddress} (${token.brand})`);
          console.log(`  Token ID: ${token.tokenId}`);
          console.log(`  Balance: ${token.balance}`);
          if (token.metadata) {
            console.log(`  Name: ${token.metadata.name || 'N/A'}`);
          }
        });

        // Optionally use retrieved tokens instead of hardcoded ones
        const retrievedTokens = retrieveResponse.data.tokens.map(token => ({
          contractAddress: token.contractAddress,
          tokenId: token.tokenId,
          count: 1 // Assuming we want to use 1 of each token
        }));

        if (retrievedTokens.length > 0) {
          console.log('\nUsing retrieved tokens for JWT generation');
          // Use the retrieved tokens instead of hardcoded ones
          tokens.length = 0; // Clear the array
          tokens.push(...retrievedTokens);
        }
      }
    }

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
