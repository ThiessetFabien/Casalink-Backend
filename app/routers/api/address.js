import express from 'express';
import { getSchema, postSchema, patchSchema, removeSchema } from '../../validation/home.schema.js';
import validate from '../../validation/validator.js';
import cw from '../../middlewares/controller.wrapper.js';
import addressController from '../../controllers/addressController.js';

const router = express.Router();

/**
@route GET /*/

router.get('/address/home/:id', validate (getSchema, 'query'), cw(addressController.getAddressByHomeId));
router.get('/address/user/:id', validate (getSchema, 'query'), cw(addressController.getAddressByUserId));
router.get('/address/:id', validate (getSchema, 'query'), cw(addressController.getAddressById));
router.get('/address/', validate (getSchema, 'query'), cw(addressController.getAllAddress));

/**
@route POST /*/

router.post('/address/', validate (postSchema, 'body'), cw(addressController.createOneAddress));

/**
@route PATCH /*/

router.patch('/address/:id', validate (patchSchema, 'body'), cw(addressController.updateOneAddress));

/**
@route DELETE /*/

router.delete('/address/:id', validate (removeSchema, 'body'), cw(addressController.deleteOneAddress));

export default router;