import { Schema } from 'mongoose';

export const EmissionRatingSchema = new Schema(
  {},
  {
    collection: 'emission_ratings',
    strict: false,
    timestamps: false,
  }
);
