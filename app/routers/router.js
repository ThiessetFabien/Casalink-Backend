import express from 'express';
import errorMiddleware from "../middlewares/error.middleware.js";
import logger from '../utils/logger.js';

import ApiRouter from './api/index.api.js';

const router = express.Router();

router.use((req, __ , next) => {
  logger.http(`${req.method} ${req.originalUrl}`);
  next();
});

// API ROUTES
router.use('/api', ApiRouter);

// ERROR MANAGER
router.use(errorMiddleware);

export default router;