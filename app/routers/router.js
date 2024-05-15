import express from 'express';
import ApiError from '../errors/api.error.js'
import errorMiddleware from "../middlewares/error.middleware.js";
import logger from '../utils/logger.js';

import { getAllTasks, getTaskById, getTaskByUserId, createOneTask, updateOneTask, deleteOneTask } from '../controllers/taskController.js';
import { getHomeByUserId, getAllHomes, getHomeById, createOneHome, updateOneHome, deleteOneHome } from '../controllers/homeController.js';
import { createOneUser, getUserById, getUserByHomeId, getAllUsers, updateOneUser, deleteOneUser } from '../controllers/userController.js';

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
router.get('/api/task/user/:id', getTaskByUserId);
router.get('/api/task/:id', getTaskById);
router.get('/api/task/', getAllTasks);

// Home routes
router.get('/api/home/user/:id', getHomeByUserId);
router.get('/api/home/:id', getHomeById);
router.get('/api/home/', getAllHomes);

// User routes
router.get('/api/user/home/:id', getUserByHomeId);
router.get('/api/user/:id', getUserById);
router.get('/api/user/', getAllUsers);

/**
@route POST /*/

router.post('/api/task/', createOneTask);
router.post('/api/home/', createOneHome);
router.post('/api/user/', createOneUser);

/**
@route PATCH /*/

router.patch('/api/task/:id', updateOneTask);
router.patch('/api/home/:id', updateOneHome);
router.patch('/api/user/:id', updateOneUser);


/**
@route DELETE /*/

router.delete('/api/task/:id', deleteOneTask);
router.delete('/api/home/:id', deleteOneHome);
router.delete('/api/user/:id', deleteOneUser);

/**
@error 404 /*/
router.use((_, __, next) => {
    next(ApiError(404, 'Not Found'));
});

router.use(errorMiddleware);

export default router;