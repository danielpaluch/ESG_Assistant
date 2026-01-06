export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  last_name: string;
  address: string;
  birth_date: Date;
}

export type RegisterPayload = RegisterRequest;
