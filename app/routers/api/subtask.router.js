/* eslint-disable import/extensions */
import express from 'express';
import { postSchema, patchSchema } from '../../validation/schemas/subtask.js';
import validate from '../../validation/validator.js';
import cw from '../../middlewares/controller.wrapper.js';
import subtaskController from '../../controllers/subtask.controller.js';
// import checkUserRole from '../../middlewares/checkUserRole.middleware.js';
const router = express.Router();

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

router.get('/subtask/:id', cw(subtaskController.getSubtaskById));

/**
*POST /api/subtask
*@summary Create a new Subtask
*@tags Post
*@param {AddressInput} request.body.required - Subtask info { description, name, task_id }
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.post('/subtask/', validate(postSchema, 'body'), cw(subtaskController.createOneSubtask));

/**
*PATCH /api/subtask/{id}/
*@summary Update a Subtask by this id
*@tags Patch
*@param {number} id.path.required - Subtask id
*@param {AddressInput} request.body.required - { description, name, task_id }
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.patch('/subtask/:id', validate(patchSchema, 'body'), cw(subtaskController.updateOneSubtask));

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

router.delete('/subtask/:id', cw(subtaskController.deleteOneSubtask));

export default router;
