import { EmissionItemDto } from '../common/emission-item.dto';

export interface CreateEmissionReportPayload {
  name: string;
  description?: string;
  company_id: string;
  emissions: EmissionItemDto[];
}
