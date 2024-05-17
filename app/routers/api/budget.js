import express from 'express';
import { getSchema, postSchema, patchSchema, removeSchema } from '../../validation/home.schema.js';
import validate from '../../validation/validator.js';
import cw from '../../middlewares/controller.wrapper.js';
import budgetController from '../../controllers/budgetController.js';

const router = express.Router();

/**
*GET /api/budget/home/{id}
*@summary Get Budget of Home by Home id
*@tags Get
*@param {number} id.path.required - Home id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/budget/home/:id', validate (getSchema, 'query'), cw(budgetController.getBudgetByHomeId));

/**
*GET /api/budget/user/{id}
*@summary Get Budget of User by User id
*@tags Get
*@param {number} id.path.required - User id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/


router.get('/budget/user/:id', validate (getSchema, 'query'), cw(budgetController.getBudgetsByUserId));

/**
*GET /api/budget/{id}
*@summary Get Budget by this  id
*@tags Get
*@param {number} id.path.required - Budget id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.get('/budget/:id', validate (getSchema, 'query'), cw(budgetController.getBudgetById));

/**
*GET /api/budget
*@summary Get all Budgets
*@tags Get
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/


router.get('/budget/', validate (getSchema, 'query'), cw(budgetController.getAllBudgets));

/**
*POST /api/budget
*@summary Create a new Budget
*@tags Post
*@param {BudgetInput} request.body.required - Budget info
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.post('/budget/', validate (postSchema, 'body'), cw(budgetController.createOneBudget));

/**
*PATCH /api/budget/{id}
*@summary Update a Budget by this id
*@tags Patch
*@param {number} id.path.required - Budget id
*@param {BudgetInput} request.body.required - Budget info
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.patch('/budget/:id', validate (patchSchema, 'body'), cw(budgetController.updateOneBudget));

/**
*DELETE /api/budget/{id}
*@summary Delete a Budget by this id
*@tags Delete
*@param {number} id.path.required - Budget id
*@return {ApiSucces} 200 - Success response - application/json
*@return {ApiJsonError} 400 - Bad Request - application/json
*@return {ApiJsonError} 404 - Not Found - application/json
*@return {ApiJsonError} 500 - Internal Server Error - application/json
*/

router.delete('/budget/:id', validate (removeSchema, 'body'), cw(budgetController.deleteOneBudget));

export default router;