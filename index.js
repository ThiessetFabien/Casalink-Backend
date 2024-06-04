// Import dependencies
import debugLib from 'debug';
import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';
import router from './app/routers/router.js';
import createDoc from './app/services/api.doc.js';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import bodySanitizer from './app/middlewares/bodySanitizer.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables 
import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV}` });
const VERSION = process.env.VERSION || 1;

const debug = debugLib('app:server');

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Setup body parser
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.use(express.json());

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: "Too many requests from this IP, please try again after an hour"
});

app.use(globalLimiter);

// app.use(sessionMiddleware);
app.use(bodySanitizer);

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

app.use(cors({ origin: process.env.CORS_ORIGIN }));

app.use(router);

export default app;