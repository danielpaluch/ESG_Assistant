import { Injectable } from '@nestjs/common';
import { CreateMembershipUseCase } from '../use-cases/create-membership.use-case';
import { GetMembershipUseCase } from '../use-cases/get-membership.use-case';
import { AcceptMembershipUseCase } from '../use-cases/accept-membership.use-case';
import { DenyMembershipUseCase } from '../use-cases/deny-membership.use-case';
import { UserDetails } from '@shared/contracts/users';
import { GetMembershipDetails } from '@shared/membership';
import {
  NotFoundException,
  ServiceUnavailableException,
} from '@shared-server/exceptions';

@Injectable()
export class MembershipService {
  constructor(
    private readonly createMembershipUseCase: CreateMembershipUseCase,
    private readonly getMembershipUseCase: GetMembershipUseCase,
    private readonly acceptMembershipUseCase: AcceptMembershipUseCase,
    private readonly denyMembershipUseCase: DenyMembershipUseCase,
  ) {}

  async createMembership(
    userId: string,
    companyId: string,
  ): Promise<UserDetails> {
    const user = await this.createMembershipUseCase.execute(userId, companyId);

    if (!user) {
      throw new ServiceUnavailableException('Membership has not been created');
    }

    return user.mapToResponse();
  }

  async acceptMembership(membershipId: string): Promise<GetMembershipDetails> {
    const membership =
      await this.acceptMembershipUseCase.execute(membershipId);

    if (!membership) {
      throw new NotFoundException('Membership not found');
    }

    return membership.mapToResponse();
  }

  async denyMembership(membershipId: string): Promise<GetMembershipDetails> {
    const membership = await this.denyMembershipUseCase.execute(membershipId);

    if (!membership) {
      throw new NotFoundException('Membership not found');
    }

    return membership.mapToResponse();
  }

  async getMembershipById(id: string): Promise<GetMembershipDetails> {
    const membership = await this.getMembershipUseCase.getMembershipById(id);

    if (!membership) {
      throw new NotFoundException('Membership not found');
    }

    return membership.mapToResponse();
  }

  async getMembershipIdsByUserId(id: string): Promise<string[]> {
    return this.getMembershipUseCase.getMembershipIdsByUserId(id);
  }

  async getMembershipIdsByCompanyId(companyId: string): Promise<string[]> {
    return this.getMembershipUseCase.getMembershipIdsByCompanyId(companyId);
  }

  async getUsersByUserIdExtendedData(id: string): Promise<UserDetails[]> {
    const users = await this.getMembershipUseCase.getUsersByUserIdExtendedData(
      id,
    );
    return users.map((user) => user.mapToResponse());
  }

  async getUsersByCompanyIdExtendedData(
    companyId: string,
  ): Promise<UserDetails[]> {
    const users =
      await this.getMembershipUseCase.getUsersByCompanyIdExtendedData(companyId);
    return users.map((user) => user.mapToResponse());
  }
}
