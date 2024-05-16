import { config } from 'dotenv';
config();

import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  password: process.env.PGPASSWORD
 });

export default pool;
