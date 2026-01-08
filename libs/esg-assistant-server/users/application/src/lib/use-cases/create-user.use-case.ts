import { Inject, Injectable } from '@nestjs/common';
import {
  User,
  USER_REPOSITORY,
  UserRepositoryPort,
} from '@esg-assistant-server/users/domain';
import { CreateUserPayload } from '@shared/contracts/users';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(payload: CreateUserPayload): Promise<User> {
    const company = User.create({
      name: payload.name,
      last_name: payload.last_name,
      email: payload.email,
      address: payload.address,
      birth_date: payload.birth_date,
      auth0_userId: payload.auth0_userId,
      creation_date: payload.creation_date,
    });
    return this.userRepository.save(company);
  }
}
