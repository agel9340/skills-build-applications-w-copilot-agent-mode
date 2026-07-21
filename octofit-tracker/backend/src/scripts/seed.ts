import { connectToDatabase } from '../config/database';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Workout } from '../models/workout';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  await connectToDatabase();

  console.log('Seed the octofit_db database with test data');

  await User.deleteMany({});
  await Team.deleteMany({});
  await Activity.deleteMany({});
  await LeaderboardEntry.deleteMany({});
  await Workout.deleteMany({});

  const users = await User.insertMany([
    { name: 'Ava Chen', email: 'ava@example.com', role: 'admin' },
    { name: 'Noah Patel', email: 'noah@example.com', role: 'member' },
    { name: 'Mina Alvarez', email: 'mina@example.com', role: 'member' },
  ]);

  await Team.insertMany([
    {
      name: 'Velocity Squad',
      sport: 'running',
      members: 8,
      goal: 'Complete 200km this month',
    },
    {
      name: 'Summit Striders',
      sport: 'cycling',
      members: 6,
      goal: 'Average 3 rides per week',
    },
  ]);

  await Activity.insertMany([
    {
      userId: users[0]._id.toString(),
      type: 'run',
      durationMinutes: 35,
      distanceKm: 5.2,
      completedAt: new Date('2026-07-20T06:30:00Z'),
    },
    {
      userId: users[1]._id.toString(),
      type: 'strength',
      durationMinutes: 45,
      completedAt: new Date('2026-07-19T19:15:00Z'),
    },
    {
      userId: users[2]._id.toString(),
      type: 'cycle',
      durationMinutes: 60,
      distanceKm: 18.4,
      completedAt: new Date('2026-07-18T07:00:00Z'),
    },
  ]);

  await LeaderboardEntry.insertMany([
    { userName: 'Ava Chen', points: 320, streak: 7 },
    { userName: 'Noah Patel', points: 280, streak: 4 },
    { userName: 'Mina Alvarez', points: 295, streak: 5 },
  ]);

  await Workout.insertMany([
    { title: 'Tempo Run Intervals', category: 'cardio', difficulty: 'intermediate', durationMinutes: 35 },
    { title: 'Core Strength Flow', category: 'strength', difficulty: 'beginner', durationMinutes: 25 },
    { title: 'Hill Cycling Drill', category: 'cycling', difficulty: 'advanced', durationMinutes: 50 },
  ]);

  console.log('Database seeding complete');
}

seedDatabase()
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
