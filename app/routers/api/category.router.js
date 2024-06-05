/* eslint-disable import/extensions */
import express from 'express';
import { postSchema, patchSchema } from '../../validation/schemas/category.js';
import validate from '../../validation/validator.js';
import cw from '../../middlewares/controller.wrapper.js';
import categoryController from '../../controllers/category.controller.js';
// import checkUserRole from '../../middlewares/checkUserRole.middleware.js';
const router = express.Router();

/**
*GET /api/category/task/{id}
*@summary Get Category of Tasks by Task id
*@tags Get
*@param {number} id.path.required - Task id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/category/task/:id', cw(categoryController.getCategoryByTaskId));

/**
*GET /api/category{id}
*@summary Get Category by this id
*@tags Get
*@param {number} id.path.required - Category id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/category/:id', cw(categoryController.getCategoryById));

/**
*POST /api/category
*@summary Create a new Category
*@tags Post
*@param {CategoryInput} request.body.required - Category info { name, color }
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.post('/category/', validate(postSchema, 'body'), cw(categoryController.createOneCategory));

/**
*PATCH /api/category/{id}
*@summary Update a Category by this id
*@tags Patch
*@param {number} id.path.required - Category id
*@param {CategoryInput} request.body.required - Category info { name, color }
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.patch('/category/:id', validate(patchSchema, 'body'), cw(categoryController.updateOneCategory));

/**
*DELETE /api/category/{id}
*@summary Delete a Category by this id
*@tags Delete
*@param {number} id.path.required - Category id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.delete('/category/:id', cw(categoryController.deleteOneCategory));

export default router;
