import Joi from 'joi';

const budgetPartValidator = Joi.string().pattern(/^./);
const amountPartValidator = Joi.string().pattern(/^\d+(\.\d{1,2})?$/).required(); // Regex to allow only digits with up to 2 decimal places


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
