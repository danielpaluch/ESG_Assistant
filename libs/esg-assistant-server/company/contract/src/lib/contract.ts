export interface CreateCompanyRequestDto {
  name: string;
  description: string;
  address: string;
  nip: string;
}

export interface CompanyResponseDto {
  id: string;
  name: string;
  description: string;
  address: string;
  nip: string;
}
