import express from 'express';
import { getSchema, postSchema, patchSchema, removeSchema } from '../../validation/home.schema.js';
import validate from '../../validation/validator.js';
import cw from '../../middlewares/controller.wrapper.js';
import categoryController from '../../controllers/categoryController.js';

const router = express.Router();

/**
@route GET /*/

router.get('/category/task/:id', validate (getSchema, 'query'), cw(categoryController.getCategoryByTaskId));
router.get('/category/:id', validate (getSchema, 'query'), cw(categoryController.getCategoryById));

/**
@route POST /*/

router.post('/category/', validate (postSchema, 'body'), cw(categoryController.createOneCategory));

/**
@route PATCH /*/

router.patch('/category/:id', validate (patchSchema, 'body'), cw(categoryController.updateOneCategory));

/**
@route DELETE /*/

router.delete('/category/:id', validate (removeSchema, 'body'), cw(categoryController.deleteOneCategory));

export default router;