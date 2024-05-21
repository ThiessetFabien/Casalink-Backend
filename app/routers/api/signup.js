import express from 'express';
import { getSchema, postSchema } from '../../validation/account.schema.js';
import validate from '../../validation/validator.js';
import accountController from '../../controllers/accountController.js';
import cw from '../../middlewares/controller.wrapper.js';

const router = express.Router();

/**
*GET /api/account
*@summary Create a new account
*@tags GET
*@param {accountInput} request.body.required - account info 
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/signup', validate(getSchema, 'query'), cw(accountController.createOneAccount));

/**
*POST /api/account/
*@summary Create a new account
*@tags Post
*@param {accountInput} request.body.required - account info { firstname, lastname, email, password, confirmPassword, home_id } }
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.post('/signup/',validate (postSchema, 'body'), cw(accountController.createOneAccount));


export default router;