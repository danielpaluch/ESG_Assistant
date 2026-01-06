import { UserDto } from '@shared/contracts/users';

import { Schema, Document } from 'mongoose';

export type UserDocument = Omit<UserDto, 'id'> & Document;

export const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  birth_date: { type: Date, required: true },
  auth0_userId: { type: String, required: true },
  creation_date: { type: Date, required: true },
});
