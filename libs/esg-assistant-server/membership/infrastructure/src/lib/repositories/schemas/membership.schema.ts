import { MembershipDto } from '@shared/membership';
import { Schema, Document } from 'mongoose';

export type MembershipDocument = Omit<MembershipDto, 'id'> & Document;

export const MembershipSchema = new Schema<MembershipDocument>({
  userId: { type: String, required: true },
  companyId: { type: String, required: true },
  role: { type: Schema.Types.Mixed, default: null },
  joinedAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['accepted', 'in acceptance'],
    default: 'in acceptance',
  },
});
