import { User } from '@esg-assistant-server/users/domain';
import { Membership } from '../models/membership.entity.js';

export const MEMBERSHIP_REPOSITORY = 'MEMBERSHIP_REPOSITORY';

export interface MembershipRepositoryPort {
  save(userId: string, companyId: string): Promise<User>;

  accept(membershipId: string): Promise<Membership>;

  deny(membershipId: string): Promise<Membership>;

  findByMembershipId(id: string): Promise<Membership>;

  findByUserId(id: string): Promise<string[]>;

  findByCompanyId(companyId: string): Promise<string[]>;

  findByUserIdExtendedData(id: string): Promise<User[]>;

  findByCompanyIdExtendedData(companyId: string): Promise<User[]>;
}
