import express from 'express';
import { getSchema, postSchema, patchSchema, removeSchema } from '../../validation/home.schema.js';
import validate from '../../validation/validator.js';
import cw from '../../middlewares/controller.wrapper.js';
import subtaskController from '../../controllers/subtaskController.js';

const router = express.Router();

/**
@route GET /*/

router.get('/subtask/task/:id', validate (getSchema, 'query'), cw(subtaskController.getSubtaskByTaskId));
router.get('/subtask/:id', validate (getSchema, 'query'), cw(subtaskController.getSubtaskById));

/**
@route POST /*/

router.post('/subtask/', validate (postSchema, 'body'), cw(subtaskController.createOneSubtask));

/**
@route PATCH /*/

router.patch('/subtask/:id', validate (patchSchema, 'body'), cw(subtaskController.updateOneSubtask));

/**
@route DELETE /*/

router.delete('/subtask/:id', validate (removeSchema, 'body'), cw(subtaskController.deleteOneSubtask));

export default router;