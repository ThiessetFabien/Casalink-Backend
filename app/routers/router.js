import express from 'express';

const router = express.Router();

router.get('/', (_, res, next) => {
  res.send('Hello World!');
  next();
});

export default router;