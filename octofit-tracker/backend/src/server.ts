import express from 'express';
import { connectToDatabase } from './config/database';

const app = express();
const port = Number(process.env.PORT ?? 8000);

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    port,
  });
});

async function start() {
  await connectToDatabase();

  app.listen(port, () => {
    console.log(`OctoFit Tracker API listening on port ${port}`);
  });
}

start().catch((error) => {
  console.error('Failed to start OctoFit Tracker API', error);
  process.exit(1);
});
