import express from 'express';
import ApiError from '../../errors/api.error.js';
import taskRouter from './task.js';
import homeRouter from './home.js';
import userRouter from './user.js';
import subtask from './subtask.js';
import category from './category.js';
import budget from './budget.js';

const router = express.Router();

router.use((_, res, next) => {
  res.type('json');
  next();
});

router.use(taskRouter);
router.use(homeRouter);
router.use(userRouter);
router.use(subtask);
router.use(category);
router.use(budget);

// error handler (404)
router.use((_, __, next) => {
  next(new ApiError(404, 'Not Found'));
});

export default router;