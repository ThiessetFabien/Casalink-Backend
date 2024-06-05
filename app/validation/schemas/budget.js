import Joi from 'joi';
/**
 * Response of API for a budget data source
 * @typedef {object} Budget
 * @property {string} category - Category of the budget
 * @property {number} amount - Amount of the budget. Should be a number with up to 2 decimal places
 * @property {string} name - Name of the budget
 * @property {string} description - Description of the budget
 * @returns {ApiJsonSucces} - A budget object
 */
const budgetPartValidator = Joi.string().pattern(/^./);
const amountPartValidator = Joi.string().pattern(/^\d+(\.\d{1,2})?$/).required();

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
