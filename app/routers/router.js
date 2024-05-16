import express from 'express';
import ApiError from '../errors/api.error.js'
import errorMiddleware from "../middlewares/error.middleware.js";
import logger from '../utils/logger.js';

import taskController from '../controllers/taskController.js';
import homeController from '../controllers/homeController.js';
import userController from '../controllers/userController.js';

const router = express.Router();

router.use((req, __ , next) => {
  logger.http(`${req.method} ${req.originalUrl}`);
  next();
});

/**
@route GET /*/

router.get('/', (_, res, next) => {
  res.send('Hello World!');
  next();
});

// Task routes
router.get('/api/task/user/:id', taskController.getTaskByUserId);
router.get('/api/task/:id', taskController.getTaskById);
router.get('/api/task/', taskController.getAllTasks);

// Home routes
router.get('/api/home/user/:id', homeController.getHomeByUserId);
router.get('/api/home/:id', homeController.getHomeById);
router.get('/api/home/', homeController.getAllHomes);

// User routes
router.get('/api/user/home/:id', userController.getUserByHomeId);
router.get('/api/user/:id', userController.getUserById);
router.get('/api/user/', userController.getAllUsers);

/**
@route POST /*/

router.post('/api/task/', taskController.createOneTask);
router.post('/api/home/', homeController.createOneHome);
router.post('/api/user/', userController.createOneUser);

/**
@route PATCH /*/

router.patch('/api/task/:id', taskController.updateOneTask);
router.patch('/api/home/:id', homeController.updateOneHome);
router.patch('/api/user/:id', userController.updateOneUser);


/**
@route DELETE /*/

router.delete('/api/task/:id', taskController.deleteOneTask);
router.delete('/api/home/:id', homeController.deleteOneHome);
router.delete('/api/user/:id', userController.deleteOneUser);

/**
@error 404 /*/
router.use((_, __, next) => {
    next(new ApiError(404, 'Not Found'));
});

router.use(errorMiddleware);

export default router;