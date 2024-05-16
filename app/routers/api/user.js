import express from 'express';
import { getSchema, postSchema, patchSchema, removeSchema } from '../../validation/user.schema.js';
import validate from '../../validation/validator.js';
import userController from '../../controllers/userController.js';

const router = express.Router();
/**
@route GET /*/

router.get('/user/home/:id',validate (getSchema, 'query'), userController.getUserByHomeId);
router.get('/user/:id',validate (getSchema, 'query'), userController.getUserById);
router.get('/user/',validate (getSchema, 'query'), userController.getAllUsers);

/**
@route POST /*/

router.post('/user/',validate (postSchema, 'body'), userController.createOneUser);

/**
@route PATCH /*/

router.patch('/user/:id',validate (patchSchema, 'body'), userController.updateOneUser);

/**
@route DELETE /*/

router.delete('/user/:id',validate (removeSchema, 'body'), userController.deleteOneUser);

export default router;