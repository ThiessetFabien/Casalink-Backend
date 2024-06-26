/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
// Import dependencies
import debugLib from 'debug';
import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
import { config } from 'dotenv';
import bodySanitizer from './app/middlewares/bodySanitizer.js';
import createDoc from './app/services/api.doc.js';
import router from './app/routers/router.js';

config({ path: '.env' });

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
  max: 2000,
  message: 'Too many requests from this IP, please try again after an hour',
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

app.use(cors({
  origin: `${process.env.CORS_ORIGIN}`,
  methods: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(router);

export default app;
