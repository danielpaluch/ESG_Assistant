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
