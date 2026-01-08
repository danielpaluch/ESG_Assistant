import { UserDetails } from '@shared/contracts/users';

export interface LoginResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  userDetails: UserDetails;
}
