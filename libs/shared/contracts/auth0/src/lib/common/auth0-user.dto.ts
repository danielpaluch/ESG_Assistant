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
