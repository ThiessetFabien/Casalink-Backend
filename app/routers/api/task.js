import express from 'express';

import taskController from '../../controllers/taskController.js';

const router = express.Router();

/**
@route GET /*/

router.get('/task/user/:id', taskController.getTaskByUserId);
router.get('/task/:id', taskController.getTaskById);
router.get('/task/', taskController.getAllTasks);

/**
@route POST /*/

router.post('/task/', taskController.createOneTask);

/**
@route PATCH /*/

router.patch('/task/:id', taskController.updateOneTask);

/**
@route DELETE /*/

router.delete('/task/:id', taskController.deleteOneTask);

export default router;