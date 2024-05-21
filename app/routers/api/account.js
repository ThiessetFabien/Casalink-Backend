import express from 'express';
import { getSchema, postSchema, patchSchema, removeSchema } from '../../validation/account.schema.js';
import validate from '../../validation/validator.js';
import accountController from '../../controllers/accountController.js';
import cw from '../../middlewares/controller.wrapper.js';

const router = express.Router();

/**
*GET /api/account/home/{id}
*@summary Get all accounts of home by home id
*@tags Get
*@param {number} id.path.required - Home id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/account/home/:id',validate (getSchema, 'query'), cw(accountController.getAccountByHomeId));

/**
*GET /api/account/{id}
*@summary Get account by this id
*@tags Get
*@param {number} id.path.required - account id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/account/:id',validate (getSchema, 'query'), cw(accountController.getAccountById));

/**
*GET /api/account
*@summary Get all accounts
*@tags Get
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/account/',validate (getSchema, 'query'), cw(accountController.getAllAccounts));

/**
*POST /api/account
*@summary Create a new account
*@tags Post
*@param {accountInput} request.body.required - account info
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.post('/account/',validate (postSchema, 'body'), cw(accountController.createOneAccount));

/**
*PATCH /api/account/{id}
*@summary Update a account by this id
*@tags Patch
*@param {number} id.path.required - account id
*@param {accountInput} request.body.required - account info
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.patch('/account/:id',validate (patchSchema, 'body'), cw(accountController.updateOneAccount));

/**
*DELETE /api/account/{id}
*@summary Delete a account by this id
*@tags Delete
*@param {number} id.path.required - account id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.delete('/account/:id',validate (removeSchema, 'body'), cw(accountController.deleteOneAccount));

export default router;