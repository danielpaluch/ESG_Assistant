import { UserDetails, UserDto, UserPrimitives } from '@shared/contracts/users';

export class User {
  private constructor(private readonly props: UserDto) {}

  //use-cases
  static create(props: UserPrimitives): User;
  //Repository create
  static create(props: UserDto): User;

  static create(props: UserPrimitives | UserDto): User {
    if ('id' in props) {
      return new User(props);
    }
    return new User({ ...props, id: '' });
  }

  mapToResponse(): UserDetails {
    return {
      id: this.props.id,
      name: this.props.name,
      last_name: this.props.last_name,
      address: this.props.address,
      email: this.props.email,
      birth_date: this.props.birth_date,
      creation_date: this.props.creation_date,
    };
  }
  toPrimitives(): UserPrimitives {
    return {
      name: this.props.name,
      last_name: this.props.last_name,
      address: this.props.address,
      email: this.props.email,
      birth_date: this.props.birth_date,
      auth0_userId: this.props.auth0_userId,
      creation_date: this.props.creation_date,
    };
  }
}
