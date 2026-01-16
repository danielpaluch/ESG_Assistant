import { Inject, Injectable } from '@nestjs/common';
import {
  EMISSION_REPOSITORY,
  EmissionRepositoryPort,
} from '@esg-assistant-server/emissions/domain';
import { EmissionPropertiesResponse } from '@shared/contracts/emissions';

@Injectable()
export class FetchEmissionPropertiesUseCase {
  constructor(
    @Inject(EMISSION_REPOSITORY)
    private readonly emissionRepository: EmissionRepositoryPort,
  ) {}

  async execute(): Promise<EmissionPropertiesResponse> {
    return this.emissionRepository.fetchProperties();
  }
}
