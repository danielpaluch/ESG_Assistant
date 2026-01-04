export interface UserDto {
  id: string;
  name: string;
  last_name: string;
  email: string;
  address: string;
  birth_date: Date;
  auth0_userId: string;
  creation_date: Date;
}

export type UserPrimitives = Omit<UserDto, 'id'>;
