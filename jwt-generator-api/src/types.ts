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
  error?: string;
}
