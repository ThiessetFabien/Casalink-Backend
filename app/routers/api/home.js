import express from 'express';

import homeController from '../../controllers/homeController.js';

const router = express.Router();

/**
@route GET /*/

router.get('/home/user/:id', homeController.getHomeByUserId);
router.get('/home/:id', homeController.getHomeById);
router.get('/home/', homeController.getAllHomes);

/**
@route POST /*/

router.post('/home/', homeController.createOneHome);

/**
@route PATCH /*/

router.patch('/home/:id', homeController.updateOneHome);

/**
@route DELETE /*/

router.delete('/home/:id', homeController.deleteOneHome);

export default router;