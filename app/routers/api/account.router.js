/* eslint-disable import/extensions */
/* eslint-disable max-len */
import express from 'express';
import { patchSchema } from '../../validation/schemas/account.js';
import validate from '../../validation/validator.js';
import accountController from '../../controllers/account.controller.js';
import cw from '../../middlewares/controller.wrapper.js';
// import {checkAdminOrAdultRole, checkAdminRole, checkAdultOrChildRole} from '../../middlewares/checkUserRole.middleware.js';

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

router.get('/account/home/:id', cw(accountController.getAccountByHomeId));
// ne marche pas
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

router.get('/account/:id', cw(accountController.getAccountById));

/**
*GET /api/account
*@summary Get all accounts
*@tags Get
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/account/', cw(accountController.getAllAccounts));

/**
*PATCH /api/account/{id}
*@summary Update a account by this id
*@tags Patch
*@param {number} id.path.required - account id
*@param {accountInput} request.body.required - account info { email, firstname, lastname, role, password, home_id }
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.patch('/account/:id', validate(patchSchema, 'body'), cw(accountController.updateOneAccount));

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

router.delete('/account/:id', cw(accountController.deleteOneAccount));

export default router;
