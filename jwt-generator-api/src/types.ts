export interface Token {
  contractAddress: string;
  tokenId: string;
  count: number;
}

export interface GetSigningStringRequest {
  tokens: Token[];
}

export interface GetSigningStringResponse {
  signingString: string;
}

// New types for JWT generation
export interface GenerateJWTsRequest {
  tokens: Token[];
  signature: string;
}

export interface TokenJWT {
  token: Token;
  jwt: string;
  metadata?: any;
}

export interface GenerateJWTsResponse {
  jwts: TokenJWT[];
}

export interface RetrieveTokensRequest {
  walletAddress: string;
}

export interface TokenOwnership {
  contractAddress: string;
  tokenId: string;
  balance: string;
  metadata: any;
  brand: string;
}

export interface RetrieveTokensResponse {
  tokens: TokenOwnership[];
}
