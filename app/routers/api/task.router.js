/* eslint-disable max-len */
/* eslint-disable import/extensions */
import express from 'express';
import { postSchema, patchSchema } from '../../validation/schemas/task.js';
import validate from '../../validation/validator.js';
import cw from '../../middlewares/controller.wrapper.js';
import taskController from '../../controllers/task.controller.js';
import subtaskController from '../../controllers/subtask.controller.js';
// import checkUserRole from '../../middlewares/checkUserRole.middleware.js';
const router = express.Router();
/**
*GET /api/task/profile/{id}
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
*GET /api/task/account/{id}
*@summary Get all Tasks FOR A SPECIFIC USER
*@tags Get
*@param {number} id.path.required - Task id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/task/account/:id', cw(taskController.getTaskByAccountId));

/**
*POST /api/task/account/{id}
*@summary Create a new Task by account id
*@tags Post
*@param {TaskInput} request.body.required - Task info { name, start_date, end_date, reward_point, priority, status, description, category_id }
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 401 - Unauthorized - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.post('/task/account/:id', validate(postSchema, 'body'), cw(taskController.createOneTaskByAccountId));

/**
*POST /api/task/profile/{id}
*@summary Create a new Task by profile id
*@tags Post
*@param {TaskInput} request.body.required - Task info { name, start_date, end_date, reward_point, priority, status, description, category_id }
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 401 - Unauthorized - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.post('/task/profile/:id', validate(postSchema, 'body'), cw(taskController.createOneTaskByProfileId));

/**
*PATCH /api/task/{id}
*@summary Update a Task by this id
*@tags Patch
*@param {number} id.path.required - Task id
*@param {TaskInput} request.body.required - Task info { name, start_date, end_date, reward_point, priority, status, description, category_id }
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 401 - Unauthorized - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.patch('/task/:id', validate(patchSchema, 'body'), (taskController.updateOneTask));

/**
*DELETE /api/task/{id}
*@summary Delete a Task by this id
*@tags Delete
*@param {number} id.path.required - Task id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 401 - Unauthorized - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.delete('/task/:id', cw(taskController.deleteOneTask));

/**
*PATCH /api/task/{id}/validate
*@summary Update a Task by this id
*@tags Patch
*@param {number} id.path.required - Task id
*@param {TaskInput} request.body.required - Task info { name, start_date, end_date, reward_point, priority, status, description, category_id }
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 401 - Unauthorized - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/
router.patch('/task/:id/validate', cw(taskController.validateTask));


export default router;
