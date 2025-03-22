import express, { Request, Response } from 'express';
import cors from 'cors';
import { GetSigningStringRequest, GetSigningStringResponse, GenerateJWTsRequest, GenerateJWTsResponse, RetrieveTokensRequest, RetrieveTokensResponse, Bounty } from './types';
import { ethers } from 'ethers';
import { _getSigningString, fetchTokenMetadata, generateTokenJWT, verifySignatureAndGetAddress, verifyTokenOwnership, retrieveOwnedTokens } from './util';
import jwt from 'jsonwebtoken';
import fs from 'node:fs';
import path from 'node:path';

const PORT = process.env.PORT || 3000;
const PRIVATE_KEY_PEM = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCjm55on1OLp1Ur
4B/N4+OKz6YL22jpjUmJzC81ghS4YQg8pb+DjUR734F6LGXLHqBuLvP5cjq5zRv3
uLWfrhj/FGDKdkk5QGRcHbF6bbwlFnfv4BpojF5Dg7SiPBa+12pva3gB99nvoT/r
q1nTGGP57DaAO7EtiFIOl+hGzPK3B3byk1xek8m4BQ9mEC/ZDrCHlDyn9wcWEsNu
vV8qlFeLbKmcWSDScKJHEFeYlyWAZGxr56hvEgA9hqomJ61VDHzqBG7kI4PYolzO
vORKnhsYTFminBnndABfnifxSFVCg+FFhLioBaAyZ452hIRX7ASQXV4L9w7ayZpI
4uNJ508fAgMBAAECggEAEc842S6uy371mIcXLzRlapDcBGJn8zR8EtH1OZ/lXYTC
fseUJ1/TWqCj2YbHteqpkBTwXfD/T4ZySu8CZlVvRyUSvDdQFTlbM2PQFAGp/2eI
usXsWgEdqb/Gg/qCh1evsF1EfQJb6Ofmq2LFrmLzTxtVe3QD/27db9U9ZaedrCqp
S6Ar7abI3Zo3bc+N6PKJEnN9Du+kj9nofi2dVjrlr/RFE+zx+7yq0aO+IpmRIP34
WOvRzTGOWtvBYAWmy4F8E4RsDJuV/coQJZ67udu9uhbzedIlZpnpjEdGdLSFwiO0
LPKr3BW/iNmE4kBfnWPO2XeKrz+tld7a4Q2hrvEDEQKBgQDNp3wJB+KrEb5G3io5
mpZfLBaf1R4NE9c2QfstdiBJ3DdqjhBgpSaAQ5mKcspnqy0G1chk8UYaP++nIrZT
8+6iPDHBd8vBwW4xjsWsQ+mjJ0oxPqTLjw7YRf3vPpHK99IzROG/t7/Yb99SMnNt
9oabx1UYsUqJo/9I72H2DsRQLQKBgQDLqQ5MdIWuUTEAFD4/bi4uAvq5OpmxwWiJ
zHDTVZD6tPN4CIq1rJWdKHoJ/tcDpOBdX22cBJoI/70vOyuh0xNkFKZpWWislRWr
Xm+ZUt74fFwHNJywkfqAp/xrFKSCcfiTfxAtBAXraFo9taHHTKz0VImFfMBMdgDD
dzKZq9xf+wKBgQC/1aSZE/b3loSEvMZsl2v/eTPdgkIW9tQA88lmndL+suIqjjxu
un9QlD5MbEmsLHvC7XaR2pKG9+8IXBPx+hA226maC7JQmau9pK11xJ/TJlpJ12KH
03mIermmCxqaV1OHqZBfcvsM3UZW+WK9R4JHG8igUPjzrbv7f/lEOoAbPQKBgDw3
GtwuI4xbwyIj2hfFCvBdvyXfFqxA5BjCEqXZickmkUnvNJvskDvsSNEFwSr5p8DT
w0O69JQukRAS7Z6mGvifRmiln9ZPKh4GCPcLUpOjqU4UFzP5pVg+0toSO2W6LuXl
TrIQm3Nz4iKWvmN/3y9Kg3KtZOn2hdlFN/fJoZnbAoGBAJaTIliqJIvO5+L3auyZ
abJ8id/nLZxAYpdCvzj1OaBHHjdrnwICTes8QNvcgcNIKdOkNjPVoGjTKXTdyBZJ
g220hxOl6PTarDEwxCAxkWEZkN/mGITN4SkLyAQe5CMKGQWczx9rsnhlcj37YLJX
KkhEi0T+msAtTMLLYFeKaEGD
-----END PRIVATE KEY-----`;
const PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo5ueaJ9Ti6dVK+AfzePj
is+mC9to6Y1JicwvNYIUuGEIPKW/g41Ee9+Beixlyx6gbi7z+XI6uc0b97i1n64Y
/xRgynZJOUBkXB2xem28JRZ37+AaaIxeQ4O0ojwWvtdqb2t4AffZ76E/66tZ0xhj
+ew2gDuxLYhSDpfoRszytwd28pNcXpPJuAUPZhAv2Q6wh5Q8p/cHFhLDbr1fKpRX
i2ypnFkg0nCiRxBXmJclgGRsa+eobxIAPYaqJietVQx86gRu5COD2KJczrzkSp4b
GExZopwZ53QAX54n8UhVQoPhRYS4qAWgMmeOdoSEV+wEkF1eC/cO2smaSOLjSedP
HwIDAQAB
-----END PUBLIC KEY-----`;
const BASE_SEPOLIA_RPC_URL = process.env.BASE_SEPOLIA_RPC_URL || 'https://sepolia.base.org';

const app = express();
app.use(cors());
app.use(express.json());
const web3Provider = new ethers.JsonRpcProvider(BASE_SEPOLIA_RPC_URL);

// Load bounties from JSON file
const bountiesFilePath = path.join(__dirname, 'bounties.json');
const BOUNTIES: Bounty[] = JSON.parse(fs.readFileSync(bountiesFilePath, 'utf8'));

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
      const tokenJwt = generateTokenJWT(token, walletAddress, metadata, PRIVATE_KEY_PEM);
      const jwtPayload = jwt.decode(tokenJwt);
      return { token, jwt: tokenJwt, jwtPayload: jwtPayload };
   }));
    return res.json({ jwts: results });
  } catch (error) {
    console.error('Error processing JWT generation:', error);
    return res.status(500).json({ jwts: [], error: 'Server error during JWT generation' });
  }
});

app.post('/retrieve-tokens', async (req: Request<{}, {}, RetrieveTokensRequest>, res: Response): Promise<Response<RetrieveTokensResponse>> => {
  try {
    const { walletAddress } = req.body;
    if (!walletAddress || !ethers.isAddress(walletAddress)) {
      return res.status(400).json({
        tokens: [],
        error: 'Invalid wallet address'
      });
    }
    const ownedTokens = await retrieveOwnedTokens(web3Provider, walletAddress);
    return res.json({ tokens: ownedTokens });
  } catch (error) {
    console.error('Error retrieving tokens:', error);
    return res.status(500).json({
      tokens: [],
      error: 'Server error while retrieving tokens'
    });
  }
});

app.get('/retrieve-bounties', (_req: Request, res: Response): Response => {
  try {
    return res.json({ bounties: BOUNTIES });
  } catch (error) {
    console.error('Error retrieving bounties:', error);
    return res.status(500).json({
      bounties: [],
      error: 'Server error while retrieving bounties'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
