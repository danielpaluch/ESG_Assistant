import { Inject, Injectable } from '@nestjs/common';
import {
  COMPANY_REPOSITORY,
  CompanyRepositoryPort,
} from '@esg-assistant-server/company/domain';
import { Company } from '@esg-assistant-server/company/domain';
import { CreateCompanyRequestDto } from '@esg-assistant-server/company/contract';

@Injectable()
export class CreateCompanyUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: CompanyRepositoryPort
  ) {}

  async execute(request: CreateCompanyRequestDto): Promise<Company> {
    const company = Company.create({
      name: request.name,
      description: request.description,
      address: request.address,
      nip: request.nip,
    });

    return this.companyRepository.save(company);
  }
}
