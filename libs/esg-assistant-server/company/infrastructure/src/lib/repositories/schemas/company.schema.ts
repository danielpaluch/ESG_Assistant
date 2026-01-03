import { CompanyDto } from '@shared/contracts/company';
import { Schema, Document } from 'mongoose';

export type CompanyDocument = Omit<CompanyDto, 'id'> & Document;

export const CompanySchema = new Schema<CompanyDocument>({
  name: { type: String, required: true },
  description: { type: String },
  address: { type: String, required: true },
  owner_id: { type: String, required: true },
  nip: { type: String, required: true },
});
