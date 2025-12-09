import { Injectable } from '@nestjs/common';
import {
  Auth0AuthenticationClient,
  CreateAuth0UserPayload,
} from '@esg-assistant/shared-server/auth0';

@Injectable()
export class AuthService {
  constructor(private readonly auth0AuthClient: Auth0AuthenticationClient) {}

  async login(email: string, password: string) {
    const tokens = await this.auth0AuthClient.loginWithPassword(
      email,
      password
    );
    return tokens;
  }

  async register(email: string, password: string) {
    const payload: CreateAuth0UserPayload = {
      email,
      password,
      connection: 'Username-Password-Authentication',
      verify_email: true,
    };

    const user = await this.auth0AuthClient.createUser(payload);
    return user;
  }
}
