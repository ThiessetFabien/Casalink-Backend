import express from 'express';
import ApiError from '../../errors/api.error.js';
import taskRouter from './task.js';
import homeRouter from './home.js';
import accountRouter from './account.js';
import subtaskRouter from './subtask.js';
import categoryRouter from './category.js';
import budgetRouter from './budget.js';
import addressRouter from './address.js';
import profileRouter from './profile.js';
import loginRouter from './login.js';
import signupRouter from './signup.js';
import session from '../../middlewares/session.js';

const router = express.Router();

router.use((_, res, next) => {
  res.type('json');
  next();
});

// route public
router.use(signupRouter);
router.use(loginRouter);

//middleware d'authentification
//router.use(session);

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