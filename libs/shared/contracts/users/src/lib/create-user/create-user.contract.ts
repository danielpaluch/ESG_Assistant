export interface CreateUserPayload {
  email: string;
  name: string;
  last_name: string;
  address: string;
  birth_date: Date;
  auth0_userId: string;
  creation_date: Date;
}
