import express from 'express';
import { getSchema, postSchema, patchSchema, removeSchema } from '../../validation/task.schema.js';
import validate from '../../validation/validator.js';
import taskController from '../../controllers/taskController.js';

const router = express.Router();

/**
*GET /api/task/user/{id}
*@summary Get all Tasks by User id
*@tags Get
*@param {number} id.path.required - User id
*@return {object} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/task/user/:id', validate (getSchema, 'query'), taskController.getTaskByUserId);

/**
*GET /api/task/{id}
*@summary Get a Task by this id
*@tags Get
*@param {number} id.path.required - User id
*@return {object} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/task/:id', validate (getSchema, 'query'), taskController.getTaskById);

/**
*GET /api/task
*@summary Get all Tasks
*@tags Get
*@return {object} 200 - Success response - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/task/', validate (getSchema, 'query'),taskController.getAllTasks);

/**
*POST /api/task
*@summary Create a new Task
*@tags Post
*@param {TaskInput} request.body.required - Task info
*@return {object} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.post('/task/', validate (postSchema, 'body'),taskController.createOneTask);

/**
*PATCH /api/task/{id}
*@summary Update a Task by this id
*@tags Patch
*@param {number} id.path.required - Task id
*@param {TaskInput} request.body.required - Task info
*@return {object} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.patch('/task/:id', validate (patchSchema, 'body'), taskController.updateOneTask);

/**
*DELETE /api/task/{id}
*@summary Delete a Task by this id
*@tags Delete
*@param {number} id.path.required - Task id
*@return {object} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.delete('/task/:id', validate (removeSchema, 'body'), taskController.deleteOneTask);

export default router;