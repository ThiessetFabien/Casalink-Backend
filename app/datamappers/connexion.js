/* eslint-disable no-underscore-dangle */
import { config } from 'dotenv';
import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

config({ path: '/.env' });
const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  url: process.env.PGURL,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync(path.resolve(__dirname, '../certs/root.crt')).toString(),
    key: fs.readFileSync(path.resolve(__dirname, '../certs/client.key')).toString(),
    cert: fs.readFileSync(path.resolve(__dirname, '../certs/client.crt')).toString()
  },
});

export default pool;
