import express from 'express';
import { getSchema, postSchema, patchSchema, removeSchema } from '../../validation/home.schema.js';
import validate from '../../validation/validator.js';
import homeController from '../../controllers/homeController.js';

const router = express.Router();

/**
@route GET /*/

router.get('/home/user/:id', validate (getSchema, 'query'), homeController.getHomeByUserId);
router.get('/home/:id', validate (getSchema, 'query'),homeController.getHomeById);
router.get('/home/', validate (getSchema, 'query'),homeController.getAllHomes);

/**
@route POST /*/

router.post('/home/', validate (postSchema, 'body'),homeController.createOneHome);

/**
@route PATCH /*/

router.patch('/home/:id', validate (patchSchema, 'body'), homeController.updateOneHome);

/**
@route DELETE /*/

router.delete('/home/:id', validate (removeSchema, 'body'), homeController.deleteOneHome);

export default router;