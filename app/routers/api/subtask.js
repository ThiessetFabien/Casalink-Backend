import express from 'express';
import { getSchema, postSchema, patchSchema, removeSchema } from '../../validation/home.schema.js';
import validate from '../../validation/validator.js';
import cw from '../../middlewares/controller.wrapper.js';
import subtaskController from '../../controllers/subtaskController.js';

const router = express.Router();

/**
*GET /api/subtask/task/{id}
*@summary Get Subtask of Task by Task id
*@tags Get
*@param {number} id.path.required - Task id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/subtask/task/:id', validate (getSchema, 'query'), subtaskController.getSubtaskByTaskId);

/**
*GET /api/subtask/{id}
*@summary Get Subtask by this id
*@tags Get
*@param {number} id.path.required - Subtask id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/subtask/:id', validate (getSchema, 'query'),subtaskController.getSubtaskById);

/**
*POST /api/subtask
*@summary Create a new Subtask
*@tags Post
*@param {AddressInput} request.body.required - Subtask info
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.post('/subtask/', validate (postSchema, 'body'),subtaskController.createOneSubtask);

/**
*PATCH /api/subtask/{id}
*@summary Update a Subtask by this id
*@tags Patch
*@param {number} id.path.required - Subtask id
*@param {AddressInput} request.body.required - Address info
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.patch('/subtask/:id', validate (patchSchema, 'body'), cw(subtaskController.updateOneSubtask));

/**
*DELETE /api/subtask/{id}
*@summary Delete a Subtask by this id
*@tags Delete
*@param {number} id.path.required - Subtask id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.delete('/subtask/:id', validate (removeSchema, 'body'), cw(subtaskController.deleteOneSubtask));

export default router;