import express from 'express';
import { getSchema, postSchema, patchSchema, removeSchema } from '../../validation/home.schema.js';
import validate from '../../validation/validator.js';

import addressController from '../../controllers/addressController.js';

const router = express.Router();

/**
@route GET /*/

router.get('/address/home/:id', validate (getSchema, 'query'), addressController.getAddressByHomeId);
router.get('/address/user/:id', validate (getSchema, 'query'), addressController.getAddressByUserId);
router.get('/address/:id', validate (getSchema, 'query'),addressController.getAddressById);
router.get('/address/', validate (getSchema, 'query'),addressController.getAllAddress);

/**
@route POST /*/

router.post('/address/', validate (postSchema, 'body'),addressController.createOneAddress);

/**
@route PATCH /*/

router.patch('/address/:id', validate (patchSchema, 'body'), addressController.updateOneAddress);

/**
@route DELETE /*/

router.delete('/address/:id', validate (removeSchema, 'body'), addressController.deleteOneAddress);

export default router;