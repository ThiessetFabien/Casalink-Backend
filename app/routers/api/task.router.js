import express from 'express';
import { postSchema, patchSchema } from '../../validation/task.schema.js';
import validate from '../../validation/validator.js';
import cw from '../../middlewares/controller.wrapper.js';
import taskController from '../../controllers/task.controller.js';
import subtaskController from '../../controllers/subtaskController.js';
import checkUserRole from '../../middlewares/checkUserRole.middleware.js';
const router = express.Router();

/**
*GET /api/task/account/{id}
*@summary Get all Tasks by account id
*@tags Get
*@param {number} id.path.required - account id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/task/profile/:id', cw(taskController.getTaskByProfileId));

/**
*GET /api/task/{id}
*@summary Get Task by this id
*@tags Get
*@param {number} id.path.required - Task id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 401 - Unauthorized - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/task/:id', cw(taskController.getTaskById));

/**
*GET /api/task/{id}/subtask
*@summary Get Subtask by Task id
*@tags Get
*@param {number} id.path.required - Task id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 401 - Unauthorized - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/task/:id/subtask', cw(subtaskController.getSubtaskById));

/**
*GET /api/task
*@summary Get all Tasks
*@tags Get
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/task/', cw(taskController.getAllTasks));

/**
*POST /api/task
*@summary Create a new Task
*@tags Post
*@param {TaskInput} request.body.required - Task info { name, start_date, end_date, reward_point, priority, status, description, category_id }
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.post('/task/', validate (postSchema, 'body'), checkUserRole, cw(taskController.createOneTask));

/**
*PATCH /api/task/{id}
*@summary Update a Task by this id
*@tags Patch
*@param {number} id.path.required - Task id
*@param {TaskInput} request.body.required - Task info { name, start_date, end_date, reward_point, priority, status, description, category_id }
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.patch('/task/:id', validate (patchSchema, 'body'), checkUserRole, cw(taskController.updateOneTask));

/**
*DELETE /api/task/{id}
*@summary Delete a Task by this id
*@tags Delete
*@param {number} id.path.required - Task id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.delete('/task/:id', checkUserRole, cw(taskController.deleteOneTask));

export default router;