import { Inject, Injectable } from '@nestjs/common';
import {
  MEMBERSHIP_REPOSITORY,
  MembershipRepositoryPort,
  Membership,
} from '@esg-assistant-server/membership/domain';

@Injectable()
export class AcceptMembershipUseCase {
  constructor(
    @Inject(MEMBERSHIP_REPOSITORY)
    private readonly membershipRepository: MembershipRepositoryPort,
  ) {}

  async execute(membershipId: string): Promise<Membership> {
    return this.membershipRepository.accept(membershipId);
  }
}
