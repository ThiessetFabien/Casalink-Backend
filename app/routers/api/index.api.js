/* eslint-disable import/extensions */
import express from 'express';
import ApiError from '../../errors/api.error.js';
import taskRouter from './task.router.js';
import homeRouter from './home.router.js';
import accountRouter from './account.router.js';
import subtaskRouter from './subtask.router.js';
import categoryRouter from './category.router.js';
import budgetRouter from './budget.router.js';
import addressRouter from './address.router.js';
import profileRouter from './profile.router.js';
import loginRouter from './login.router.js';
import signupRouter from './signup.router.js';
import jwtMiddleware from '../../middlewares/jwt.middleware.js';

const router = express.Router();

router.use((_, res, next) => {
  res.type('json');
  next();
});

// route public
router.use(signupRouter);
router.use(loginRouter);

router.use(jwtMiddleware);

router.use(taskRouter);
router.use(homeRouter);
router.use(accountRouter);
router.use(subtaskRouter);
router.use(categoryRouter);
router.use(budgetRouter);
router.use(addressRouter);
router.use(profileRouter);

// error handler (404)
router.use((_, __, next) => {
  next(new ApiError(404, 'Not Found'));
});

export default router;
