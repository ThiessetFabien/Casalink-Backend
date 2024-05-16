
// Import dependencies
import debugLib from 'debug';
import express, { urlencoded } from 'express';
import router from './app/routers/router.js';
import createDoc from './app/services/api.doc.js';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';

// Load environment variables
import { config } from 'dotenv';

const debug = debugLib('app:server');

const __dirname = dirname(fileURLToPath(import.meta.url));

config({ path: `${__dirname}/.env.${process.env.NODE_ENV}` });

const app = express();

app.use(express.json());

// Setup body parser
app.use(urlencoded({ extended: true }));

/**
 * GET /api-doc
 * @summary Get documentation
 * @tags Base
 * @return {object} 200 - success response - application/json
 * @return {ApiJsonError} 400 - Bad request response - application/json
 */

createDoc(app);

// Starting server
const PORT = process.env.PORT ?? 3000;

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:4000", "http://localhost:5000",],
  })
);

app.use(router);

if (process.env.NODE_ENV === 'production') {
  app.listen(PORT, () => debug(`🖌️ Server ready: http://localhost:${PORT})`));
} else {
  app.listen(PORT, () => debug(`🖌️ Server ready in development mode: http://localhost:${PORT})`));
}

export default app;