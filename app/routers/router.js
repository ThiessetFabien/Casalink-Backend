import express from 'express';
import ApiError from '../errors/api.error.js'
import errorMiddleware from "../middlewares/error.middleware.js";

const router = express.Router();

/**
 * @route Get /
 */
router.get('/', (_, res, next) => {
  res.send('Hello World!');
  next();
});


/**
 * @error 404
 */
router.use((_, __, next) => {
    next(ApiError(404, 'Not Found'));
});

router.use(errorMiddleware);

export default router;