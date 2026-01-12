import { Inject, Injectable } from '@nestjs/common';
import {
  MEMBERSHIP_REPOSITORY,
  MembershipRepositoryPort,
  Membership,
} from '@esg-assistant-server/membership/domain';
import { User } from '@esg-assistant-server/users/domain';

@Injectable()
export class GetMembershipUseCase {
  constructor(
    @Inject(MEMBERSHIP_REPOSITORY)
    private readonly membershipRepository: MembershipRepositoryPort,
  ) {}

  async getMembershipById(id: string): Promise<Membership> {
    return this.membershipRepository.findByMembershipId(id);
  }

  async getMembershipIdsByUserId(id: string): Promise<string[]> {
    return this.membershipRepository.findByUserId(id);
  }

  async getMembershipIdsByCompanyId(companyId: string): Promise<string[]> {
    return this.membershipRepository.findByCompanyId(companyId);
  }

  async getUsersByUserIdExtendedData(id: string): Promise<User[]> {
    return this.membershipRepository.findByUserIdExtendedData(id);
  }

  async getUsersByCompanyIdExtendedData(companyId: string): Promise<User[]> {
    return this.membershipRepository.findByCompanyIdExtendedData(companyId);
  }
}
