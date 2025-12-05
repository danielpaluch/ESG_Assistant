import { Inject, Injectable } from '@nestjs/common';
import {
  COMPANY_REPOSITORY,
  CompanyRepositoryPort,
} from '@esg-assistant-server/company/domain';
import { Company } from '@esg-assistant-server/company/domain';

@Injectable()
export class GetCompanyUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: CompanyRepositoryPort
  ) {}

  async getCompanies(
    page: number,
    per_page: number
  ): Promise<{ items: Company[]; results: number }> {
    return this.companyRepository.findAll(page, per_page);
  }

  async getCompanyById(id: string): Promise<Company | null> {
    return this.companyRepository.findById(id);
  }
}
