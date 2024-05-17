import express from 'express';
import { getSchema, postSchema, patchSchema, removeSchema } from '../../validation/user.schema.js';
import validate from '../../validation/validator.js';

import userController from '../../controllers/userController.js';
import addressController from '../../controllers/addressController.js';
import homeController from '../../controllers/homeController.js';
import taskController from '../../controllers/taskController.js';

const router = express.Router();

/**
*GET /api/user/home/{id}
*@summary Get all users of home by home id
*@tags Get
*@param {number} id.path.required - User id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/user/home/:id',validate (getSchema, 'query'), userController.getUserByHomeId);
router.get('/user/:id',validate (getSchema, 'query'), userController.getUserById);
router.get('/user/',validate (getSchema, 'query'), userController.getAllUsers);

/**
*POST /api/user
*@summary Create a new Task
*@tags Post
*@param {UserInput} request.body.required - Task info
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.post('/user/',validate (postSchema, 'body'), userController.createOneUser);

/**
*PATCH /api/user/{id}
*@summary Update a User by this id
*@tags Patch
*@param {number} id.path.required - User id
*@param {UserInput} request.body.required - User info
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.patch('/user/:id',validate (patchSchema, 'body'), userController.updateOneUser);

/**
*DELETE /api/user/{id}
*@summary Delete a User by this id
*@tags Delete
*@param {number} id.path.required - User id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.delete('/user/:id',validate (removeSchema, 'body'), userController.deleteOneUser);

export default router;