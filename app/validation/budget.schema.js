import Joi from 'joi';

const budgetPartValidator = Joi.string().pattern(/^./);

export const getSchema = Joi.object({
    category: budgetPartValidator,
    amount: budgetPartValidator,
    name: budgetPartValidator,
    description: budgetPartValidator,
});

export const postSchema = Joi.object({
    category: budgetPartValidator,
    amount: budgetPartValidator,
    name: budgetPartValidator,
    description: budgetPartValidator,
});

export const patchSchema = Joi.object({
    category: budgetPartValidator,
    amount: budgetPartValidator,
    name: budgetPartValidator,
    description: budgetPartValidator,
});

export const removeSchema = Joi.object({
    category: budgetPartValidator,
    amount: budgetPartValidator,
    name: budgetPartValidator,
    description: budgetPartValidator,
});