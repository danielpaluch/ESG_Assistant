import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CreateEmissionReportUseCase,
  EmissionsService,
  FetchEmissionPropertiesUseCase,
  GetEmissionsByTypeUseCase,
  ListEmissionReportsUseCase,
} from '@esg-assistant-server/emissions/application';
import { EMISSION_REPOSITORY } from '@esg-assistant-server/emissions/domain';
import {
  EmissionMongooseRepository,
  EmissionRatingSchema,
  EmissionRecordSchema,
} from '@esg-assistant-server/emissions/infrastructure';
import { EmissionsController } from './controllers/emissions.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'EmissionRating', schema: EmissionRatingSchema },
      { name: 'EmissionRecord', schema: EmissionRecordSchema },
    ]),
  ],
  controllers: [EmissionsController],
  providers: [
    EmissionsService,
    CreateEmissionReportUseCase,
    FetchEmissionPropertiesUseCase,
    GetEmissionsByTypeUseCase,
    ListEmissionReportsUseCase,
    {
      provide: EMISSION_REPOSITORY,
      useClass: EmissionMongooseRepository,
    },
  ],
  exports: [EmissionsService],
})
export class EmissionsModule {}
