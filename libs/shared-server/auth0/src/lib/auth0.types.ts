export interface Auth0AuthConfig {
  domain: string;
  clientId: string;
  clientSecret: string;
  mgmt_audience: string;
  mgmt_clientId: string;
  mgmt_clientSecret: string;
}

export interface Auth0ManagementConfig {
  domain: string;
  clientId: string;
  clientSecret: string;
  audience: string;
  connection?: string;
  realm?: string;
}

export interface Auth0TokenResponse {
  access_token: string;
  id_token?: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
}

export interface Auth0User {
  user_id: string;
  email: string;
  email_verified: boolean;
  name?: string;
  nickname?: string;
  picture?: string;
  app_metadata?: Record<string, unknown>;
  user_metadata?: Record<string, unknown>;
}

export interface CreateAuth0UserPayload {
  email: string;
  password: string;
  connection: string;
  email_verified?: boolean;
  verify_email?: boolean;
  app_metadata?: Record<string, unknown>;
  user_metadata?: Record<string, unknown>;
}
