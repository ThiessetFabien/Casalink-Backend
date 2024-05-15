import { config } from 'dotenv';
config();

import Pool from 'pg';

const pool = new Pool({
  password: process.env.PGPASSWORD
});

export default pool;
