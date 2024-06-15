/* eslint-disable no-underscore-dangle */
import { config } from 'dotenv';

config({ path: `/.env` });

import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  url: process.env.PGURL,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;