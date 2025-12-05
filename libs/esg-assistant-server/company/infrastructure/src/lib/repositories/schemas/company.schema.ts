import { Schema, Document } from 'mongoose';

export interface CompanyDocument extends Document {
  name: string;
  description: string;
  nip: string;
  address: string;
}

export const CompanySchema = new Schema<CompanyDocument>({
  name: { type: String, required: true },
  description: { type: String },
  address: { type: String, required: true },
  nip: { type: String, required: true },
});
