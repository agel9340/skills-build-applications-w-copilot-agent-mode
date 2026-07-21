import express from 'express';
import { connectToDatabase } from './config/database';
import { User } from './models/user';
import { Team } from './models/team';
import { Activity } from './models/activity';
import { LeaderboardEntry } from './models/leaderboard';
import { Workout } from './models/workout';

const app = express();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME?.trim();
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    port,
    baseUrl,
  });
});

app.get(['/api/users', '/api/users/'], async (_req, res) => {
  const users = await User.find({}).lean();
  res.json({
    baseUrl,
    users: users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    })),
  });
});

app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json({
    baseUrl,
    teams: teams.map((team) => ({
      id: team._id,
      name: team.name,
      sport: team.sport,
      members: team.members,
      goal: team.goal,
    })),
  });
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  const activities = await Activity.find({}).lean();
  res.json({
    baseUrl,
    activities: activities.map((activity) => ({
      id: activity._id,
      userId: activity.userId,
      type: activity.type,
      durationMinutes: activity.durationMinutes,
      distanceKm: activity.distanceKm ?? null,
      completedAt: activity.completedAt,
    })),
  });
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).lean();
  res.json({
    baseUrl,
    leaderboard: leaderboard.map((entry) => ({
      id: entry._id,
      userName: entry.userName,
      points: entry.points,
      streak: entry.streak,
    })),
  });
});

app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json({
    baseUrl,
    workouts: workouts.map((workout) => ({
      id: workout._id,
      title: workout.title,
      category: workout.category,
      difficulty: workout.difficulty,
      durationMinutes: workout.durationMinutes,
    })),
  });
});

async function start() {
  await connectToDatabase();

  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit Tracker API listening on port ${port}`);
    console.log(`API base URL: ${baseUrl}`);
  });
}

start().catch((error) => {
  console.error('Failed to start OctoFit Tracker API', error);
  process.exit(1);
});
