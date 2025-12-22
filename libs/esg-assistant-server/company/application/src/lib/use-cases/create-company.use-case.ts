import { Inject, Injectable } from '@nestjs/common';
import {
  COMPANY_REPOSITORY,
  CompanyRepositoryPort,
} from '@esg-assistant-server/company/domain';
import { Company } from '@esg-assistant-server/company/domain';
import { CreateCompanyPayload } from 'shared/contracts/company';

@Injectable()
export class CreateCompanyUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: CompanyRepositoryPort
  ) {}

  async execute(payload: CreateCompanyPayload): Promise<Company> {
    const { name, description, address, nip } = payload;
    const company = Company.create({
      name,
      description,
      address,
      nip,
    });
    return this.companyRepository.save(company);
  }
}
