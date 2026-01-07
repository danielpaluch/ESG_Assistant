import {
  CreateUserUseCase,
  GetUserUseCase,
} from '@esg-assistant-server/users/application';
import { Injectable } from '@nestjs/common';
import { Auth0AuthenticationClient } from '@esg-assistant/shared-server/auth0';
import { CreateAuth0UserPayload } from '@shared/contracts/auth0';
import { CreateUserPayload } from '@shared/contracts/users';
import { LoginResponse, RegisterPayload } from '@esg-assistant/authentication';

@Injectable()
export class AuthService {
  constructor(
    private readonly auth0AuthClient: Auth0AuthenticationClient,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  async login(email: string, password: string): Promise<LoginResponse | Error> {
    const token = await this.auth0AuthClient.loginWithPassword(email, password);

    if (!token)
      return new Error(
        'Cannot login, cannot estabilish connection with Auth0.',
      );

    const user = await this.getUserUseCase.getUserByAuth0Id(token.sub);

    if (!user)
      return new Error(
        'Cannot login, cannot estabilish connection with database.',
      );

    return {
      access_token: token.access_token,
      expires_in: token.expires_in,
      token_type: token.token_type,
      userDetails: user.mapToResponse(),
    };
  }

  async register(payload: RegisterPayload) {
    const payloadAuth0: CreateAuth0UserPayload = {
      email: payload.email,
      password: payload.password,
      connection: 'Username-Password-Authentication',
      verify_email: true,
    };

    const auth0User = await this.auth0AuthClient.createUser(payloadAuth0);

    if (auth0User) {
      const userPayload: CreateUserPayload = {
        email: payload.email,
        name: payload.name,
        last_name: payload.last_name,
        address: payload.address,
        birth_date: payload.birth_date,
        auth0_userId: auth0User.user_id,
        creation_date: new Date(),
      };

      const user = await this.createUserUseCase.execute(userPayload);
      return user.mapToResponse();
    }

    return new Error('User not created');
  }
}
