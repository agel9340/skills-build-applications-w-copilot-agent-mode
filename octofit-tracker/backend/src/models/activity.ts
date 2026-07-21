import mongoose, { Schema, type Document } from 'mongoose';

export interface IActivity extends Document {
  userId: string;
  type: string;
  durationMinutes: number;
  distanceKm?: number;
  completedAt: Date;
}

const activitySchema = new Schema<IActivity>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number },
  completedAt: { type: Date, default: Date.now },
});

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
