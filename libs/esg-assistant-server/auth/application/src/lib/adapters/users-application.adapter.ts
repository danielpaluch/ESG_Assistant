import { Injectable } from '@nestjs/common';
import { AuthUsersPort } from '@esg-assistant-server/auth/domain';
import {
  CreateUserUseCase,
  GetUserUseCase,
} from '@esg-assistant-server/users/application';
import { CreateUserPayload, UserDetails } from '@shared/contracts/users';

@Injectable()
export class UsersApplicationAdapter implements AuthUsersPort {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  async getUserByAuth0Id(auth0Id: string): Promise<UserDetails | null> {
    const user = await this.getUserUseCase.getUserByAuth0Id(auth0Id);

    return user ? user.mapToResponse() : null;
  }

  async createUser(payload: CreateUserPayload): Promise<UserDetails> {
    const user = await this.createUserUseCase.execute(payload);

    return user.mapToResponse();
  }
}
