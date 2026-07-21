"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const user_1 = require("./models/user");
const team_1 = require("./models/team");
const activity_1 = require("./models/activity");
const leaderboard_1 = require("./models/leaderboard");
const workout_1 = require("./models/workout");
const app = (0, express_1.default)();
const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'octofit-backend',
        port,
        baseUrl,
    });
});
app.get(['/api/users', '/api/users/'], async (_req, res) => {
    const users = await user_1.User.find({}).lean();
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
    const teams = await team_1.Team.find({}).lean();
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
    const activities = await activity_1.Activity.find({}).lean();
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
    const leaderboard = await leaderboard_1.LeaderboardEntry.find({}).lean();
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
    const workouts = await workout_1.Workout.find({}).lean();
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
    await (0, database_1.connectToDatabase)();
    app.listen(port, '0.0.0.0', () => {
        console.log(`OctoFit Tracker API listening on port ${port}`);
        console.log(`API base URL: ${baseUrl}`);
    });
}
start().catch((error) => {
    console.error('Failed to start OctoFit Tracker API', error);
    process.exit(1);
});
