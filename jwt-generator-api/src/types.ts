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

// Bounty-related types
export interface BountyRequirement {
  type: string;     // Type of requirement (e.g., "ownership", "price", "date")
  description: string; // Human-readable description
  parameters: {
    [key: string]: any;  // Parameters specific to the requirement type
  };
}

export interface Bounty {
  id: string;       // Unique identifier for the bounty
  name: string;     // Name of the bounty
  description: string; // Description of what the bounty is about
  startDate: string;   // ISO date string for start date
  endDate: string;     // ISO date string for end date
  requirements: BountyRequirement[]; // List of requirements to fulfill this bounty
  reward?: string;     // Optional description of the reward
}

export interface RetrieveBountiesResponse {
  bounties: Bounty[];
}
