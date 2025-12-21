export const createCompanyUrl = '/companies';

export type CreateCompanyPayload = CreateCompanyRequestBody;

export interface CreateCompanyRequestBody {
  name: string;
  description: string;
  address: string;
  nip: string;
}