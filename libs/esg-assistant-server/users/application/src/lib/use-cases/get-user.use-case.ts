import {
  User,
  USER_REPOSITORY,
  UserRepositoryPort,
} from '@esg-assistant-server/users/domain';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async getUsers(
    page: number,
    per_page: number,
  ): Promise<{ items: User[]; results: number }> {
    return this.userRepository.findAll(page, per_page);
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
