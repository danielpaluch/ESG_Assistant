import { Inject, Injectable } from '@nestjs/common';
import {
  MEMBERSHIP_REPOSITORY,
  MembershipRepositoryPort,
} from '@esg-assistant-server/membership/domain';
import { User } from '@esg-assistant-server/users/domain';

@Injectable()
export class CreateMembershipUseCase {
  constructor(
    @Inject(MEMBERSHIP_REPOSITORY)
    private readonly membershipRepository: MembershipRepositoryPort,
  ) {}

  async execute(userId: string, companyId: string): Promise<User> {
    return this.membershipRepository.save(userId, companyId);
  }
}
