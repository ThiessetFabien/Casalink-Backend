import express from 'express';
import { postSchema } from '../../validation/account.schema.js';
import validate from '../../validation/validator.js';
import cw from '../../middlewares/controller.wrapper.js';
import accountController from '../../controllers/account.controller.js';

const router = express.Router();

/**
*POST /api/login/
*@summary Post connexion of connexion by connexion id
*@tags Post
*@param {number} id.path.required - connexion id 
*@param {loginInput} request.body.required - Profile info { email, password }
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.post('/login/', validate (postSchema, 'body'), cw(accountController.loginForm));

export default router;