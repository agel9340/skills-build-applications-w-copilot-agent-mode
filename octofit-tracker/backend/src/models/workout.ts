import mongoose, { Schema, type Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  category: string;
  difficulty: string;
  durationMinutes: number;
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
});

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
