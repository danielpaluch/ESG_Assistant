import {
  GetMembershipDetails,
  MembershipDto,
  MembershipPrimitives,
} from '@shared/membership';

export class Membership {
  private constructor(private readonly props: MembershipDto) {}

  //use-cases
  static create(props: MembershipPrimitives): Membership;
  //Repository create
  static create(props: MembershipDto): Membership;

  static create(props: MembershipPrimitives | MembershipDto): Membership {
    if ('id' in props) {
      return new Membership(props);
    }
    return new Membership({ ...props, id: '' });
  }

  mapToResponse(): GetMembershipDetails {
    return {
      id: this.props.id,
      userId: this.props.userId,
      companyId: this.props.companyId,
      role: this.props.role,
      joinedAt: this.props.joinedAt,
      status: this.props.status,
    };
  }

  toPrimitives(): MembershipPrimitives {
    return {
      userId: this.props.userId,
      companyId: this.props.companyId,
      role: this.props.role,
      joinedAt: this.props.joinedAt,
      status: this.props.status,
    };
  }
}
