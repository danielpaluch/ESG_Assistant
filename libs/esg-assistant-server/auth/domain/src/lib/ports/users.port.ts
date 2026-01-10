import { CreateUserPayload, UserDetails } from '@shared/contracts/users';

export const AUTH_USERS_PORT = 'AUTH_USERS_PORT';

export interface AuthUsersPort {
  getUserByAuth0Id(auth0Id: string): Promise<UserDetails | null>;
  createUser(payload: CreateUserPayload): Promise<UserDetails>;
}
