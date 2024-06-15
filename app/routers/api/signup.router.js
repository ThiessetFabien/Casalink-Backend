/* eslint-disable import/extensions */
/* eslint-disable max-len */
import express from 'express';
import { postSchema } from '../../validation/schemas/account.js';
import validate from '../../validation/validator.js';
import accountController from '../../controllers/account.controller.js';
import cw from '../../middlewares/controller.wrapper.js';

const router = express.Router();

/**
*POST /api/account/
*@summary Create a new account
*@tags Post
*@param {accountInput} request.body.required - account info { firstname, lastname, email, password, confirmPassword, home_id } }
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 401 - Unauthorized - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.post('/signup', validate(postSchema, 'body'), (accountController.createOneAccount));

export default router;
