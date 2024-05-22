import { config } from 'dotenv';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

config({ path: `${__dirname}/.env.development` });

import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  password: process.env.PGPASSWORD
});

export default pool;