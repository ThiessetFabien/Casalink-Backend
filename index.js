
// Import dependencies
import debugLib from 'debug';
import express, { urlencoded } from 'express';
import router from './app/routers/router.js';
import createDoc from './app/services/api.doc.js';
import cors from 'cors';
import session from 'express-session';
import rateLimit from 'express-rate-limit';
import bodySanitizer from './app/middlewares/bodySanitizer.js';

// Load environment variables 
import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV}` });
const VERSION = process.env.VERSION || 1;

const debug = debugLib('app:server');

const app = express();

app.use(express.json());

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after an hour"
});

app.use(globalLimiter);
app.use(bodySanitizer);

// Setup body parser
app.use(urlencoded({ extended: true }));

app.use(session({
  saveUnititialized: true,
  resave: true,
  secret: process.env.SESSION_SECRET,
  cache: {
    maxAge: 24 * 60 * 60 * 1000
  }
}))

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

if (process.env.NODE_ENV === 'production') {
  app.listen(PORT, () => debug(`🖌️ Server ready: http://localhost:${PORT}/api/v${VERSION})`));
} else {
  app.listen(PORT, () => debug(`🖌️ Server ready in development mode: http://localhost:${PORT}/api/v${VERSION})`));
}

export default app;