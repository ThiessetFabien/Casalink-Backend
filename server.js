/* eslint-disable import/extensions */
import app from './index.js';
import debugLib from 'debug';
import { config } from 'dotenv';
config({ path: `/.env` });

const debug = debugLib('app:server');
const PORT = process.env.PORT ?? 3000;
const VERSION = process.env.VERSION || 1;

if (process.env.NODE_ENV === 'production') {
  app.listen(PORT, () => debug(`🖌️ Server ready: https://casalink-back.vercel.app)`));
} else {
  app.listen(PORT, () => debug(`✨ Server ready in development mode: http://localhost:${PORT}/api/v${VERSION})`));
}