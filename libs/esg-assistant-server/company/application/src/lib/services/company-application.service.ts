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

  async getAllCompanies(): Promise<CompanyResponseDto[]> {
    const companies = await this.getCompanyUseCase.getCompanies();

    return companies.map((company) => company.mapToResponse());
  }

  async getCompanyById(id: string): Promise<CompanyResponseDto | null> {
    const company: Company | null = await this.getCompanyUseCase.getCompanyById(
      id
    );

    if (!company) throw new NotFoundException('Company not found');

    return company.mapToResponse();
  }
}
