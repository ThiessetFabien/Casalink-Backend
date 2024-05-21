import express from 'express';
import ApiError from '../../errors/api.error.js';

const router = express.Router();

// error handler (404)
router.use((_, __, next) => {
  next(new ApiError(404, 'Not Found'));
});

export default router;