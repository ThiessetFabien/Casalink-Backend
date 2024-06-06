/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
// Import dependencies
import debugLib from 'debug';
import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// import rateLimit from 'express-rate-limit';
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

// const globalLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 200,
//   message: 'Too many requests from this IP, please try again after an hour',
// });

// app.use(globalLimiter);

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

// app.use(cors({
//   origin: process.env.CORS_ORIGIN, optionsSuccessStatus: 200, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'],
// }));
const allowedOrigins = process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim());

// CORS options
const corsOptions = {
  origin(origin, callback) {
    // Allow any origin if wildcard is present
    if (allowedOrigins.includes('*')) {
      callback(null, true);
    } else if (!origin || allowedOrigins.includes(origin)) {
      // Allow requests with no origin (like mobile apps or curl requests) or from allowed origins
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};

// Use CORS middleware with defined options
app.use(cors(corsOptions));

app.use(router);

export default app;
