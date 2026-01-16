import { Inject, Injectable } from '@nestjs/common';
import {
  EmissionRecord,
  EMISSION_REPOSITORY,
  EmissionRepositoryPort,
} from '@esg-assistant-server/emissions/domain';
import {
  CreateEmissionReportPayload,
  EmissionItemDto,
} from '@shared/contracts/emissions';
import {
  ArgumentInvalidException,
  ArgumentNotProvidedException,
} from '@shared-server/exceptions';

@Injectable()
export class CreateEmissionReportUseCase {
  constructor(
    @Inject(EMISSION_REPOSITORY)
    private readonly emissionRepository: EmissionRepositoryPort,
  ) {}

  async execute(
    payload: CreateEmissionReportPayload,
    userId: string,
  ): Promise<EmissionRecord> {
    if (!userId) {
      throw new ArgumentNotProvidedException('user_id is required');
    }
    if (!payload?.company_id) {
      throw new ArgumentNotProvidedException('company_id is required');
    }

    let produced_co2 = 0;
    const emissions = payload.emissions ?? [];

    for (const emission of emissions) {
      const factor = await this.getEmissionFactor(emission);
      produced_co2 += (emission.amount ?? 0) * factor;
    }

    const record = EmissionRecord.create({
      name: payload.name,
      description: payload.description,
      user_id: userId,
      company_id: payload.company_id,
      emissions: emissions,
      produced_co2: Number(produced_co2.toFixed(6)),
      submitted_at: new Date().toISOString(),
    });

    return this.emissionRepository.save(record);
  }

  private async getEmissionFactor(emission: EmissionItemDto): Promise<number> {
    const factor = await this.emissionRepository.findEmissionFactor({
      type: emission.type,
      category: emission.category,
      unit: emission.unit,
      fuel: emission.fuel,
      material: emission.material,
      sub_type: emission.sub_type,
      vehicle_group: emission.vehicle_group,
      vehicle: emission.vehicle,
      propulsion: emission.propulsion,
    });

    if (factor === null || Number.isNaN(factor)) {
      throw new ArgumentInvalidException(
        `Emission factor not found for: ${JSON.stringify({
          type: emission.type,
          category: emission.category,
          unit: emission.unit,
          fuel: emission.fuel,
          material: emission.material,
          sub_type: emission.sub_type,
          vehicle_group: emission.vehicle_group,
          vehicle: emission.vehicle,
          propulsion: emission.propulsion,
        })}`,
      );
    }

    return factor;
  }
}
