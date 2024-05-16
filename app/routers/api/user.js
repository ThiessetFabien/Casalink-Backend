import express from 'express';

import userController from '../../controllers/userController.js';

const router = express.Router();
/**
@route GET /*/

router.get('/user/home/:id', userController.getUserByHomeId);
router.get('/user/:id', userController.getUserById);
router.get('/user/', userController.getAllUsers);

/**
@route POST /*/

router.post('/user/', userController.createOneUser);

/**
@route PATCH /*/

router.patch('/user/:id', userController.updateOneUser);

/**
@route DELETE /*/

router.delete('/user/:id', userController.deleteOneUser);

export default router;