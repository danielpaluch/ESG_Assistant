export interface CreateAuth0UserPayload {
  email: string;
  password: string;
  connection: string;

  email_verified?: boolean;
  verify_email?: boolean;
  app_metadata?: Record<string, unknown>;
  user_metadata?: Record<string, unknown>;
}
