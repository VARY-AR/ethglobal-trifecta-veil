import express, { Request, Response } from 'express';
import cors from 'cors';
import { GetSigningStringRequest, GetSigningStringResponse, GenerateJWTsRequest, GenerateJWTsResponse } from './types';
import { ethers } from 'ethers';
import { _getSigningString, fetchTokenMetadata, generateTokenJWT, verifySignatureAndGetAddress, verifyTokenOwnership } from './util';

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const BASE_SEPOLIA_RPC_URL = process.env.BASE_SEPOLIA_RPC_URL || 'https://sepolia.base.org';

const app = express();
app.use(cors());
app.use(express.json());
const web3Provider = new ethers.JsonRpcProvider(BASE_SEPOLIA_RPC_URL);

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
      req.body.tokens.map(token => verifyTokenOwnership(web3Provider, token, walletAddress))
    );
    if (ownershipChecks.some(isOwner => !isOwner)) {
      return res.status(403).json({
        jwts: [],
        error: 'Access denied. You are not the owner of one or more requested tokens.'
      });
    }
    const results = await Promise.all(req.body.tokens.map(async (token) => {
      const metadata = await fetchTokenMetadata(web3Provider, token);
      const tokenJwt = generateTokenJWT(token, walletAddress, metadata, JWT_SECRET);
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
