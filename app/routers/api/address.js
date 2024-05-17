import express from 'express';
import { getSchema, postSchema, patchSchema, removeSchema } from '../../validation/home.schema.js';
import validate from '../../validation/validator.js';

import addressController from '../../controllers/addressController.js';

const router = express.Router();

/**
*GET /api/address/home/{id}
*@summary Get Address of Home by Home id
*@tags Get
*@param {number} id.path.required - Home id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/address/home/:id', validate (getSchema, 'query'), addressController.getAddressByHomeId);

/**
*GET /api/address/Address/{id}
*@summary Get Address of Address by Address id
*@tags Get
*@param {number} id.path.required - Address id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/address/Address/:id', validate (getSchema, 'query'), addressController.getAddressByAddressId);

/**
*GET /api/address/{id}
*@summary Get Address by this id
*@tags Get
*@param {number} id.path.required - Address id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/


router.get('/address/:id', validate (getSchema, 'query'),addressController.getAddressById);

/**
*GET /api/address
*@summary Get all Address
*@tags Get
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/


router.get('/address/', validate (getSchema, 'query'),addressController.getAllAddress);

/**
*POST /api/address
*@summary Create a new Address
*@tags Post
*@param {AddressInput} request.body.required - Address info
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.post('/address/', validate (postSchema, 'body'),addressController.createOneAddress);

/**
*PATCH /api/address/{id}
*@summary Update a Address by this id
*@tags Patch
*@param {number} id.path.required - Address id
*@param {AddressInput} request.body.required - Address info
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.patch('/address/:id', validate (patchSchema, 'body'), addressController.updateOneAddress);

/**
*DELETE /api/address/{id}
*@summary Delete a Address by this id
*@tags Delete
*@param {number} id.path.required - Address id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.delete('/address/:id', validate (removeSchema, 'body'), addressController.deleteOneAddress);

export default router;