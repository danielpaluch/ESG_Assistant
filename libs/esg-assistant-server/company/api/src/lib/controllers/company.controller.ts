import { Body, Controller, Get, Post } from '@nestjs/common';
import { CompanyResponseDto } from '@esg-assistant-server/company/contract';
import { CompanyApplicationService } from '@esg-assistant-server/company/application';
import { CreateCompanyHttpRequestDto } from '../dtos/company.dto';

@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyApplicationService: CompanyApplicationService
  ) {}

  @Post()
  async createCompany(
    @Body() body: CreateCompanyHttpRequestDto
  ): Promise<CompanyResponseDto> {
    return this.companyApplicationService.createCompany(body);
  }

  @Get()
  async getAllCompanies(): Promise<CompanyResponseDto[]> {
    return this.companyApplicationService.getAllCompanies();
  }
}
