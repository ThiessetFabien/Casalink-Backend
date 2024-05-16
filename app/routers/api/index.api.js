import express from 'express';
import ApiError from '../../errors/api.error.js';
import taskRouter from './task.js';
import homeRouter from './home.js';
import userRouter from './user.js';

const router = express.Router();

router.use((_, res, next) => {
  res.type('json');
  next();
});

router.use(taskRouter);
router.use(homeRouter);
router.use(userRouter);

/*
error handler (404)
*/
router.use((_, __, next) => {
  next(new ApiError(404, 'Not Found'));
});

export default router;