import express from 'express';
import { getSchema, postSchema, patchSchema, removeSchema } from '../../validation/adress.schema.js';
import validate from '../../validation/validator.js';
import cw from '../../middlewares/controller.wrapper.js';
import addressController from '../../controllers/addressController.js';

const router = express.Router();

/**
*GET /api/address/home/{id}
*@summary Get Address of Home by this id
*@tags Get
*@param {number} id.path.required - Home id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/address/home/:id', validate (getSchema, 'query'), cw(addressController.getAddressByHomeId));

/**
*GET /api/address/{id}
*@summary Get Address of Address by Address id
*@tags Get
*@param {number} id.path.required - Address id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/address/:id', validate (getSchema, 'query'), cw(addressController.getAddressById));

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


router.get('/address/:id', validate (getSchema, 'query'), cw(addressController.getAddressById));

/**
*GET /api/address
*@summary Get all Address
*@tags Get
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/


router.get('/address/', validate (getSchema, 'query'), cw(addressController.getAllAddress));

/**
*POST /api/address
*@summary Create a new Address
*@tags Post
*@param {AddressInput} request.body.required - Address info { street, city, additional_information, postal_code, country }
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.post('/address/', validate (postSchema, 'body'), cw(addressController.createOneAddress));

/**
*PATCH /api/address/{id}
*@summary Update a Address by this id
*@tags Patch
*@param {number} id.path.required - Address id
*@param {AddressInput} request.body.required - Address info { street, city, additional_information, postal_code, country }
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.patch('/address/:id', validate (patchSchema, 'body'), cw(addressController.updateOneAddress));

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

router.delete('/address/:id', validate (removeSchema, 'body'), cw(addressController.deleteOneAddress));

export default router;