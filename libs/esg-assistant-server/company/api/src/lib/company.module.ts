import { Module } from '@nestjs/common';
import { CompanyController } from './controllers/company.controller';
import {
  CompanyApplicationService,
  CreateCompanyUseCase,
  GetCompanyUseCase,
} from '@esg-assistant-server/company/application';
import { COMPANY_REPOSITORY } from '@esg-assistant-server/company/domain';
import {
  CompanySchema,
  CompanyMongooseRepository,
} from '@esg-assistant-server/company/infrastructure';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
  ],
  controllers: [CompanyController],
  providers: [
    CompanyApplicationService,
    CreateCompanyUseCase,
    GetCompanyUseCase,
    {
      provide: COMPANY_REPOSITORY,
      useClass: CompanyMongooseRepository,
    },
  ],
  exports: [CompanyApplicationService],
})
export class CompanyModule {}
