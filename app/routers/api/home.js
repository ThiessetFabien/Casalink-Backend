import express from 'express';
import { getSchema, postSchema, patchSchema, removeSchema } from '../../validation/home.schema.js';
import validate from '../../validation/validator.js';

import homeController from '../../controllers/homeController.js';
import addressController from '../../controllers/addressController.js';
import budgetController from '../../controllers/budgetController.js';

const router = express.Router();

/**
@route GET /*/

router.get('/home/user/:id', validate (getSchema, 'query'), homeController.getHomeByUserId);
router.get('/home/:id/address', validate (getSchema, 'query'),addressController.getAddressByHomeId);
router.get('/home/:id/budget', validate (getSchema, 'query'),budgetController.getBudgetByHomeId);
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