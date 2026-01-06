import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CompanyApplicationService } from '@esg-assistant-server/company/application';
import { GetCompanyDetailsResponse } from '@shared/contracts/company';
import { CreateCompanyHttpRequestDto } from '../dtos/company.dto';
import { PaginatedResponse } from '@esg-assistant/shared-server/pagination';
import { CurrentUser } from '@esg-assistant-server/auth/api';
import { JwtAuthGuard } from '@shared-server/jwt';

@UseGuards(JwtAuthGuard)
@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyApplicationService: CompanyApplicationService,
  ) {}

  @Post()
  async createCompany(
    @Body() body: CreateCompanyHttpRequestDto,
    @CurrentUser() currentUser: { sub: string },
  ): Promise<GetCompanyDetailsResponse> {
    return this.companyApplicationService.createCompany(body, currentUser.sub);
  }

  @Get(':id')
  async getCompanyById(
    @Param('id') id: string,
  ): Promise<GetCompanyDetailsResponse | null> {
    return this.companyApplicationService.getCompanyById(id);
  }

  @Get()
  async getAllCompanies(
    @Query('page') page = 1,
    @Query('per_page') per_page = 10,
  ): Promise<PaginatedResponse<GetCompanyDetailsResponse>> {
    return this.companyApplicationService.getAllCompanies(page, per_page);
  }
}
