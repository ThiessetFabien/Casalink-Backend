import express from 'express';
import { getSchema, postSchema, patchSchema, removeSchema } from '../../validation/home.schema.js';
import validate from '../../validation/validator.js';

import categoryController from '../../controllers/categoryController.js';

const router = express.Router();

/**
@route GET /*/

router.get('/category/task/:id', validate (getSchema, 'query'), categoryController.getCategoryByTaskId);
router.get('/category/:id', validate (getSchema, 'query'),categoryController.getCategoryById);

/**
@route POST /*/

router.post('/category/', validate (postSchema, 'body'),categoryController.createOneCategory);

/**
@route PATCH /*/

router.patch('/category/:id', validate (patchSchema, 'body'), categoryController.updateOneCategory);

/**
@route DELETE /*/

router.delete('/category/:id', validate (removeSchema, 'body'), categoryController.deleteOneCategory);

export default router;