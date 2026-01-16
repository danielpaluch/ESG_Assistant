import { EmissionRecordDto } from '@shared/contracts/emissions';
import { Schema, Document } from 'mongoose';

export type EmissionRecordDocument = Omit<EmissionRecordDto, 'id'> & Document;

export const EmissionRecordSchema = new Schema<EmissionRecordDocument>({
  name: { type: String, required: true },
  description: { type: String },
  user_id: { type: String, required: true },
  company_id: { type: String, required: true },
  emissions: [],
  produced_co2: { type: Number, required: true },
  submitted_at: { type: String, required: true },
});
