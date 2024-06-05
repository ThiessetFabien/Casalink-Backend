import { resolve } from 'node:path';
import { cwd } from 'node:process';
import { config } from 'dotenv';

config({ path: resolve(cwd(), '.env.test') });
