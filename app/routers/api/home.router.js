/* eslint-disable import/extensions */
import express from 'express';
import { postSchema, patchSchema } from '../../validation/schemas/home.js';
import validate from '../../validation/validator.js';
import homeController from '../../controllers/home.controller.js';
import cw from '../../middlewares/controller.wrapper.js';

const router = express.Router();

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

router.get('/home/:id', cw(homeController.getHomeById));

/**
*GET /api/home
*@summary Get all Homes
*@tags Get
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/home/', cw(homeController.getAllHomes));

/**
*POST /api/home
*@summary Create a new Home
*@tags Post
*@param {HomeInput} request.body.required - Home info { shopping_list, name }
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.post('/home/', validate(postSchema, 'body'), cw(homeController.createOneHome));

/**
*PATCH /api/home/{id}
*@summary Update a Home by this id
*@tags Patch
*@param {number} id.path.required - Home id
*@param {HomeInput} request.body.required - Home info { shopping_list, name }
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.patch('/home/:id', validate(patchSchema, 'body'), cw(homeController.updateOneHome));

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

router.delete('/home/:id', cw(homeController.deleteOneHome));

export default router;
