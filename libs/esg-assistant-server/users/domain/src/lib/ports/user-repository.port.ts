import { User } from '../models/user.entity.js';

export const USER_REPOSITORY = 'User_REPOSITORY';

export interface UserRepositoryPort {
  save(company: User): Promise<User>;

  findById(id: string): Promise<User | null>;

  findAll(
    page: number,
    per_page: number,
  ): Promise<{ items: User[]; results: number }>;
}
