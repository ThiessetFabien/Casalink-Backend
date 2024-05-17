import express from 'express';
import { getSchema, postSchema, patchSchema, removeSchema } from '../../validation/home.schema.js';
import validate from '../../validation/validator.js';
import cw from '../../middlewares/controller.wrapper.js';
import budgetController from '../../controllers/budgetController.js';

const router = express.Router();

/**
@route GET /*/

router.get('/budget/home/:id', validate (getSchema, 'query'), cw(budgetController.getBudgetByHomeId));
router.get('/budget/user/:id', validate (getSchema, 'query'), cw(budgetController.getBudgetsByUserId));
router.get('/budget/:id', validate (getSchema, 'query'), cw(budgetController.getBudgetById));
router.get('/budget/', validate (getSchema, 'query'), cw(budgetController.getAllBudgets));

/**
@route POST /*/

router.post('/budget/', validate (postSchema, 'body'), cw(budgetController.createOneBudget));

/**
@route PATCH /*/

router.patch('/budget/:id', validate (patchSchema, 'body'), cw(budgetController.updateOneBudget));

/**
@route DELETE /*/

router.delete('/budget/:id', validate (removeSchema, 'body'), cw(budgetController.deleteOneBudget));

export default router;