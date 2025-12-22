import { PaginatedResponse } from '@esg-assistant/shared-server/pagination';
import { GetCompanyUseCase } from './../use-cases/get-company.use-case';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyUseCase } from '../use-cases/create-company.use-case';
import { Company } from '@esg-assistant-server/company/domain';
import { CreateCompanyPayload, GetCompanyDetailsResponse } from 'shared/contracts/company';

@Injectable()
export class CompanyApplicationService {
  constructor(
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly getCompanyUseCase: GetCompanyUseCase
  ) {}

  async createCompany(
    payload: CreateCompanyPayload
  ): Promise< GetCompanyDetailsResponse> {
    const company: Company = await this.createCompanyUseCase.execute(payload);

    return company.mapToResponse();
  }

  async getAllCompanies(
    page: number,
    per_page: number
  ): Promise<PaginatedResponse<GetCompanyDetailsResponse>> {
    const { items, results } = await this.getCompanyUseCase.getCompanies(
      page,
      per_page
    );

    return {
      items: items.map((company) => company.mapToResponse()),
      results: results,
      page: page,
      per_page: per_page,
    };
  }

  async getCompanyById(id: string): Promise<GetCompanyDetailsResponse | null> {
    const company: Company | null = await this.getCompanyUseCase.getCompanyById(
      id
    );

    if (!company) throw new NotFoundException('Company not found');

    return company.mapToResponse();
  }
}
