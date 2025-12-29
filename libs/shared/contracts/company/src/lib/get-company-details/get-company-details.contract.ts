import { CompanyDto } from '../common/company.dto';

export const getCompanyDetailsUrl = '/companies/:companyId';

export type GetCompanyDetailsPayload = GetCompanyDetailsQueryParams;

export interface GetCompanyDetailsQueryParams {
  companyId: string;
}

export type GetCompanyDetailsResponse = CompanyDto;

