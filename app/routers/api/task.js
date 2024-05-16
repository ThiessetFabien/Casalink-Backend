import express from 'express';
import { getSchema, postSchema, patchSchema, removeSchema } from '../../validation/task.schema.js';
import validate from '../../validation/validator.js';
import taskController from '../../controllers/taskController.js';

const router = express.Router();

/**
@route GET /*/

router.get('/task/user/:id', validate (getSchema, 'query'), taskController.getTaskByUserId);
router.get('/task/:id', validate (getSchema, 'query'), taskController.getTaskById);
router.get('/task/', validate (getSchema, 'query'),taskController.getAllTasks);

/**
@route POST /*/

router.post('/task/', validate (postSchema, 'body'),taskController.createOneTask);

/**
@route PATCH /*/

router.patch('/task/:id', validate (patchSchema, 'body'), taskController.updateOneTask);

/**
@route DELETE /*/

router.delete('/task/:id', validate (removeSchema, 'body'), taskController.deleteOneTask);

export default router;