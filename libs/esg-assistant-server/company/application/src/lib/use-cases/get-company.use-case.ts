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

  async getCompanies(): Promise<Company[]> {
    return this.companyRepository.findAll();
  }
}
