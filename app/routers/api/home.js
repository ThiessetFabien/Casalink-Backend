import express from 'express';
import { getSchema, postSchema, patchSchema, removeSchema } from '../../validation/home.schema.js';
import validate from '../../validation/validator.js';

import homeController from '../../controllers/homeController.js';
import addressController from '../../controllers/addressController.js';
import budgetController from '../../controllers/budgetController.js';

const router = express.Router();

/**
*GET /api/home/user/{id}
*@summary Get all Users of Home by Home id
*@tags Get
*@param {number} id.path.required - User id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/home/user/:id', validate (getSchema, 'query'), homeController.getHomeByUserId);

/**
*GET /api/home/{id}
*@summary Get Home by this id
*@tags Get
*@param {number} id.path.required - Home id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/home/:id', validate (getSchema, 'query'),homeController.getHomeById);

/**
*GET /api/home
*@summary Get all Homes
*@tags Get
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/home/', validate (getSchema, 'query'),homeController.getAllHomes);

/**
*POST /api/home
*@summary Create a new Home
*@tags Post
*@param {HomeInput} request.body.required - Home info
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.post('/home/', validate (postSchema, 'body'),homeController.createOneHome);

/**
*PATCH /api/home/{id}
*@summary Update a Home by this id
*@tags Patch
*@param {number} id.path.required - Home id
*@param {HomeInput} request.body.required - Home info
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.patch('/home/:id', validate (patchSchema, 'body'), homeController.updateOneHome);

/**
*DELETE /api/home/{id}
*@summary Delete a Home by this id
*@tags Delete
*@param {number} id.path.required - Home id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.delete('/home/:id', validate (removeSchema, 'body'), homeController.deleteOneHome);

export default router;