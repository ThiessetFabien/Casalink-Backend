/* eslint-disable no-underscore-dangle */
import { config } from 'dotenv';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import pg from 'pg';

const __dirname = dirname(fileURLToPath(import.meta.url));

config({ path: `${__dirname}/.env.development` });
const { Pool } = pg;

const pool = new Pool({
  password: process.env.PGPASSWORD,
});

export default pool;
