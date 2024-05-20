import express from 'express';
import { getSchema, postSchema, patchSchema, removeSchema } from '../../validation/home.schema.js';
import validate from '../../validation/validator.js';
import cw from '../../middlewares/controller.wrapper.js';
import profileController from '../../controllers/profileController.js';

const router = express.Router();

/**
*GET /api/user/{id}/profile
*@summary Get profile of User by User id
*@tags Get
*@param {number} id.path.required - user id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/user/:id/profile', validate (getSchema, 'query'), cw(profileController.getProfileByUserId));


/**
*GET /api/user/{id}
*@summary Get Profile of User by home id
*@tags Get
*@param {number} id.path.required - Home id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/


router.get('/home/:id/profile', validate (getSchema, 'query'), cw(profileController.getProfileByHomeId));

/**
*GET /api/profile/{id}
*@summary Get Profile by this  id
*@tags Get
*@param {number} id.path.required - Profile id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/profile/:id', validate (getSchema, 'query'), cw(profileController.getProfileById));

/**
*POST /api/profile/
*@summary Create a new Profile
*@tags Post
*@param {BudgetInput} request.body.required - Profile info
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.post('/profile/', validate (postSchema, 'body'), cw(profileController.createOneProfile));

/**
*PATCH /api/profile/{id}
*@summary Update a profile by this id
*@tags Patch
*@param {number} id.path.required - Profile id
*@param {BudgetInput} request.body.required - Profile info
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
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
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.delete('/profile/:id', validate (removeSchema, 'body'), cw(profileController.deleteOneProfile));

export default router;