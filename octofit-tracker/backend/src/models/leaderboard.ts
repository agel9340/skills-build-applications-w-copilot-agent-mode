import mongoose, { Schema, type Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userName: string;
  points: number;
  streak: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userName: { type: String, required: true },
  points: { type: Number, required: true },
  streak: { type: Number, required: true },
});

export const LeaderboardEntry = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
