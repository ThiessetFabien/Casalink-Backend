import express from 'express';
import ApiError from '../../errors/api.error.js';
import taskRouter from './task.js';
import homeRouter from './home.js';
import userRouter from './user.js';
import subtaskRouter from './subtask.js';
import categoryRouter from './category.js';
import budgetRouter from './budget.js';

const router = express.Router();

router.use((_, res, next) => {
  res.type('json');
  next();
});

router.use(taskRouter);
router.use(homeRouter);
router.use(userRouter);
router.use(subtaskRouter);
router.use(categoryRouter);
router.use(budgetRouter);

// error handler (404)
router.use((_, __, next) => {
  next(new ApiError(404, 'Not Found'));
});

export default router;