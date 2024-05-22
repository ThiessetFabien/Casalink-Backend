import Joi from 'joi';

const budgetPartValidator = Joi.string().pattern(/^./);
const amountPartValidator = Joi.string().pattern(/^\d+(\.\d{1,2})?$/).required(); // Regex to allow only digits with up to 2 decimal places

/**
* Response of API for a budget data source
* @typedef {object} Budget
* @property {string} category - Points are excluded
* @property {string} amount.required - Two decimal places are required
* @property {string} name - Points are excluded
* @returns {ApiJsonSucces} - a budget object
*/

/**
 * Budget schema for the GET method
 */

export const getSchema = Joi.object({
    category: budgetPartValidator,
    amount: amountPartValidator,
    name: budgetPartValidator,
    description: budgetPartValidator,
});

/**
 * Budget schema for the POST method
 */

export const postSchema = Joi.object({
    category: budgetPartValidator,
    amount: amountPartValidator,
    name: budgetPartValidator,
    description: budgetPartValidator,
});

/**
 * Budget schema for the PATCH method
 */

export const patchSchema = Joi.object({
    category: budgetPartValidator,
    amount: amountPartValidator,
    name: budgetPartValidator,
    description: budgetPartValidator,
});

/**
 * Budget schema for the DELETE method
 */

export const removeSchema = Joi.object({
    category: budgetPartValidator,
    amount: amountPartValidator,
    name: budgetPartValidator,
    description: budgetPartValidator,
});