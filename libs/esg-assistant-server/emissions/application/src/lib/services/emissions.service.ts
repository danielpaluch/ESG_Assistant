import { Injectable } from '@nestjs/common';
import {
  EmissionPropertiesResponse,
  EmissionRatingDto,
  EmissionRecordDto,
  CreateEmissionReportPayload,
} from '@shared/contracts/emissions';
import {
  NotFoundException,
  ServiceUnavailableException,
} from '@shared-server/exceptions';
import { CreateEmissionReportUseCase } from '../use-cases/create-emission-report.use-case';
import { FetchEmissionPropertiesUseCase } from '../use-cases/fetch-emission-properties.use-case';
import { GetEmissionsByTypeUseCase } from '../use-cases/get-emissions-by-type.use-case';
import { ListEmissionReportsUseCase } from '../use-cases/list-emission-reports.use-case';

@Injectable()
export class EmissionsService {
  constructor(
    private readonly createEmissionReportUseCase: CreateEmissionReportUseCase,
    private readonly fetchEmissionPropertiesUseCase: FetchEmissionPropertiesUseCase,
    private readonly getEmissionsByTypeUseCase: GetEmissionsByTypeUseCase,
    private readonly listEmissionReportsUseCase: ListEmissionReportsUseCase,
  ) {}

  async createEmissionReport(
    payload: CreateEmissionReportPayload,
    userId: string,
  ): Promise<EmissionRecordDto> {
    const record = await this.createEmissionReportUseCase.execute(
      payload,
      userId,
    );

    if (!record) {
      throw new ServiceUnavailableException(
        'Emission report has not been created',
      );
    }

    return record.mapToResponse();
  }

  async listEmissionReports(): Promise<EmissionRecordDto[]> {
    const records = await this.listEmissionReportsUseCase.execute();
    return records.map((record) => record.mapToResponse());
  }

  async getEmissionsByType(type: string): Promise<EmissionRatingDto[]> {
    const emissions = await this.getEmissionsByTypeUseCase.execute(type);
    if (!emissions || emissions.length === 0) {
      throw new NotFoundException('No emissions data found');
    }

    return emissions;
  }

  async fetchProperties(): Promise<EmissionPropertiesResponse> {
    return this.fetchEmissionPropertiesUseCase.execute();
  }
}
