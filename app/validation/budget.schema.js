import Joi from 'joi';

const budgetPartValidator = Joi.string().pattern(/^./);
const amountPartValidator = Joi.string().pattern(/^\d+(\.\d{1,2})?$/).required(); // Regex to allow only digits with up to 2 decimal places

export const getSchema = Joi.object({
    category: budgetPartValidator,
    amount: amountPartValidator,
    name: budgetPartValidator,
    description: budgetPartValidator,
});

export const postSchema = Joi.object({
    category: budgetPartValidator,
    amount: amountPartValidator,
    name: budgetPartValidator,
    description: budgetPartValidator,
});

export const patchSchema = Joi.object({
    category: budgetPartValidator,
    amount: amountPartValidator,
    name: budgetPartValidator,
    description: budgetPartValidator,
});

export const removeSchema = Joi.object({
    category: budgetPartValidator,
    amount: amountPartValidator,
    name: budgetPartValidator,
    description: budgetPartValidator,
});