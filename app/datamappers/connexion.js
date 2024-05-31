import { config } from 'dotenv';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

config({ path: `${__dirname}/.env.development` });

import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  url: process.env.PGURL,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE
});

export default pool;