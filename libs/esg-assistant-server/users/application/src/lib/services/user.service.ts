import { Injectable } from '@nestjs/common';
import { GetUserUseCase } from '../use-cases/get-user.use-case';
import { UserDetails } from '@shared/contracts/users';
import { PaginatedResponse } from '@esg-assistant/shared-server/pagination';
import { User } from '@esg-assistant-server/users/domain';
import { NotFoundException } from '@shared-server/exceptions';

@Injectable()
export class UserService {
  constructor(private readonly getUserUseCase: GetUserUseCase) {}

  async getAllUsers(
    page: number,
    per_page: number,
  ): Promise<PaginatedResponse<UserDetails>> {
    const { items, results } = await this.getUserUseCase.getUsers(
      page,
      per_page,
    );

    return {
      items: items.map((user) => user.mapToResponse()),
      results: results,
      page: page,
      per_page: per_page,
    };
  }

  async getUserById(id: string): Promise<UserDetails | null> {
    const user: User | null = await this.getUserUseCase.getUserById(id);

    if (!user) throw new NotFoundException('User not found');

    return user.mapToResponse();
  }
}
