const express = require('express');
const { Pool } = require('pg');
const redis = require('redis');

const app = express();
app.use(express.json());

const ENV = process.env.APP_ENV || 'dev';

// Postgres Connection
const pool = new Pool({
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'supersecretpassword',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'appdb',
  port: 5432,
});

// Redis Connection
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST || 'localhost'}:6379`
});
redisClient.connect().catch(console.error);

app.get('/api/info', async (req, res) => {
  try {
    let visits = 0;
    if (redisClient.isOpen) {
      visits = await redisClient.incr('visit_count');
    }
    res.json({
      message: `hey u logged into ${ENV} env`,
      environment: ENV,
      redisVisits: visits,
      status: 'Connected to DB & Cache'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log(`Backend running on port 5000 in ${ENV} mode`));
