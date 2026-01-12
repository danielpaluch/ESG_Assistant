import { StatusType } from '../types/status.type';

export interface MembershipDto {
  id: string;
  userId: string;
  companyId: string;
  role: unknown;
  joinedAt: Date;
  status: StatusType;
}
