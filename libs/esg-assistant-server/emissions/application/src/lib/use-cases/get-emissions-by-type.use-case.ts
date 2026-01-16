import { Inject, Injectable } from '@nestjs/common';
import {
  EMISSION_REPOSITORY,
  EmissionRepositoryPort,
} from '@esg-assistant-server/emissions/domain';
import { EmissionRatingDto } from '@shared/contracts/emissions';

const TYPE_MAP: Record<string, string> = {
  fuel: 'fuel',
  water: 'water',
  bioenergy: 'bioenergy',
  vehicles: 'vehicles',
  electric_energy: 'electric energy',
  purchased_material: 'purchased material',
};

@Injectable()
export class GetEmissionsByTypeUseCase {
  constructor(
    @Inject(EMISSION_REPOSITORY)
    private readonly emissionRepository: EmissionRepositoryPort,
  ) {}

  async execute(type: string): Promise<EmissionRatingDto[]> {
    const realType = TYPE_MAP[type];
    if (!realType) return [];
    return this.emissionRepository.getEmissionsByType(realType);
  }
}
