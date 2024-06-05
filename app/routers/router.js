/* eslint-disable import/extensions */
import express from 'express';
import { config } from 'dotenv';
import errorMiddleware from '../middlewares/error.middleware.js';
import logger from '../utils/logger.js';

import apiRouter from './api/index.api.js';

config({ path: '.env.development' });

const router = express.Router();

const VERSION = process.env.VERSION || 1;

router.use((req, __, next) => {
  logger.http(`${req.method} ${req.originalUrl}`);
  next();
});

/**
 * A api succes object
 * @typedef {object} ApiSucces
 * @property {number} status - Status response
 * @property {object} data - Data response
 */

// API ROUTES
router.use(`/api/v${VERSION}`, apiRouter);

// ERROR MANAGER
router.use(errorMiddleware);

export default router;
