import { Inject, Injectable } from '@nestjs/common';
import {
  EMISSION_REPOSITORY,
  EmissionRepositoryPort,
} from '@esg-assistant-server/emissions/domain';
import { EmissionRecord } from '@esg-assistant-server/emissions/domain';

@Injectable()
export class ListEmissionReportsUseCase {
  constructor(
    @Inject(EMISSION_REPOSITORY)
    private readonly emissionRepository: EmissionRepositoryPort,
  ) {}

  async execute(): Promise<EmissionRecord[]> {
    return this.emissionRepository.findAll();
  }
}
