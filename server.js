/* eslint-disable import/extensions */
import debugLib from 'debug';
import app from './index.js';

const debug = debugLib('app:server');
const PORT = process.env.PORT ?? 3000;
const VERSION = process.env.VERSION || 1;

if (process.env.NODE_ENV === 'production') {
  app.listen(PORT, () => debug(`🖌️ Server ready: http://localhost:${PORT}/api/v${VERSION})`));
} else {
  app.listen(PORT, () => debug(`✨ Server ready in development mode: http://localhost:${PORT}/api/v${VERSION})`));
}
