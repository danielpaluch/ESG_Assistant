import { EmissionItemDto, EmissionRatingDto } from '@shared/contracts/emissions';
import { EmissionRecord } from '../models/emission-record.entity.js';

export const EMISSION_REPOSITORY = 'EMISSION_REPOSITORY';

export type EmissionFactorQuery = Pick<
  EmissionItemDto,
  | 'type'
  | 'category'
  | 'unit'
  | 'fuel'
  | 'material'
  | 'sub_type'
  | 'vehicle_group'
  | 'vehicle'
  | 'propulsion'
>;

export interface EmissionRepositoryPort {
  save(record: EmissionRecord): Promise<EmissionRecord>;

  findAll(): Promise<EmissionRecord[]>;

  findByCompanyId(companyId: string): Promise<EmissionRecord[]>;

  findEmissionFactor(query: EmissionFactorQuery): Promise<number | null>;

  getEmissionsByType(type: string): Promise<EmissionRatingDto[]>;

  fetchProperties(): Promise<Record<string, Record<string, string[]>>>;
}
