import express from 'express';
import { postSchema, patchSchema } from '../../validation/profile.schema.js';
import validate from '../../validation/validator.js';
import cw from '../../middlewares/controller.wrapper.js';
import profileController from '../../controllers/profile.controller.js';
import upload from '../../middlewares/imagesUpload.middleware.js';
// import checkUserRole from '../../middlewares/checkUserRole.middleware.js';
const router = express.Router();

/**
*GET /api/account/{id}/profile
*@summary Get profile of account by account id
*@tags Get
*@param {number} id.path.required - account id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 401 - Unauthorized - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/account/:id/profile', cw(profileController.getProfileByAccountId));

/**
*GET /api/account/{id}
*@summary Get Profile of account by home id
*@tags Get
*@param {number} id.path.required - Home id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 401 - Unauthorized - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/home/:id/profile', cw(profileController.getProfileByHomeId));

/**
*GET /api/profile/{id}
*@summary Get Profile by this  id
*@tags Get
*@param {number} id.path.required - Profile id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 401 - Unauthorized - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/profile/:id', cw(profileController.getProfileById));

/**
*POST /api/profile/
*@summary Create a new Profile
*@tags Post
*@param {BudgetInput} request.body.required - Profile info
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal  Server Error - application/json
*/

router.post('/profile/', validate (postSchema, 'body'), profileController.createOneProfile);

router.post('/profile/upload', profileController.imageBase64);
/**
*PATCH /api/profile/{id}
*@summary Update a profile by this id
*@tags Patch
*@param {number} id.path.required - Profile id
*@param {BudgetInput} request.body.required - Profile info { name, birthdate, role, pin, score, image, email, account_id }
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 401 - Unauthorized - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.patch('/profile/:id', validate (patchSchema, 'body'), cw(profileController.updateOneProfile));

/**
*DELETE /api/profile/{id}
*@summary Delete a profile by this id
*@tags Delete
*@param {number} id.path.required - profile id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 401 - Unauthorized - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.delete('/profile/:id', cw(profileController.deleteOneProfile));

export default router;