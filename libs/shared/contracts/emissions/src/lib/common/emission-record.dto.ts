import { EmissionItemDto } from './emission-item.dto';

export interface EmissionRecordDto {
  id: string;
  name: string;
  description?: string;
  user_id: string;
  company_id: string;
  emissions: EmissionItemDto[];
  produced_co2: number;
  submitted_at: string;
}
