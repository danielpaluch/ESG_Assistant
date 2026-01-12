import { MembershipDto } from '../common/membership.dto';

export type GetMembershipDetails = MembershipDto;

export type MembershipPrimitives = Omit<MembershipDto, 'id'>;
