import express from 'express';
import ApiError from '../../errors/api.error.js';
import taskRouter from './task.router.js';
import homeRouter from './home.router.js';
import accountRouter from './account.router.js';
import subtaskRouter from './subtask.js';
import categoryRouter from './category.js';
import budgetRouter from './budget.js';
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

router.use(jwtMiddleware, taskRouter);
router.use(jwtMiddleware, homeRouter);
router.use(jwtMiddleware, accountRouter);
router.use(jwtMiddleware, subtaskRouter);
router.use(jwtMiddleware, categoryRouter);
router.use(jwtMiddleware, budgetRouter);
router.use(jwtMiddleware, addressRouter);
router.use(jwtMiddleware, profileRouter);

// error handler (404)
router.use((_, __, next) => {
  next(new ApiError(404, 'Not Found'));
});

export default router;