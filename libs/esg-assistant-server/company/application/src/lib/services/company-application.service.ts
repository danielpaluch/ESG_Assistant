import { PaginatedResponse } from '@esg-assistant/shared-server/pagination';
import { GetCompanyUseCase } from './../use-cases/get-company.use-case';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyUseCase } from '../use-cases/create-company.use-case';
import {
  CreateCompanyRequestDto,
  CompanyResponseDto,
} from '@esg-assistant-server/company/contract';
import { Company } from '@esg-assistant-server/company/domain';

@Injectable()
export class CompanyApplicationService {
  constructor(
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly getCompanyUseCase: GetCompanyUseCase
  ) {}

  async createCompany(
    request: CreateCompanyRequestDto
  ): Promise<CompanyResponseDto> {
    const company: Company = await this.createCompanyUseCase.execute(request);

    return company.mapToResponse();
  }

  async getAllCompanies(
    page: number,
    per_page: number
  ): Promise<PaginatedResponse<CompanyResponseDto>> {
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

  async getCompanyById(id: string): Promise<CompanyResponseDto | null> {
    const company: Company | null = await this.getCompanyUseCase.getCompanyById(
      id
    );

    if (!company) throw new NotFoundException('Company not found');

    return company.mapToResponse();
  }
}
