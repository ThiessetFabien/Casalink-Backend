import express from 'express';
import ApiError from '../../errors/api.error.js';
import taskRouter from './task.js';
import homeRouter from './home.js';
import userRouter from './user.js';
import budgetRouter from './budget.js';
import categoryRouter from './category.js';
import subtaskRouter from './subtask.js';

const router = express.Router();

/* router.use((_, res, next) => {
  res.type('json');
  next();
}); */

router.use(taskRouter);
router.use(homeRouter);
router.use(userRouter);
router.use(budgetRouter);
router.use(categoryRouter);
router.use(subtaskRouter);

/**
@error 404 /*/
 router.use((_, __, next) => {
  next(new ApiError(404, 'Not Found'));
});

export default router;