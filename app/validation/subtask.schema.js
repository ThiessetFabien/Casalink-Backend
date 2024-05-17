import Joi from 'joi';

const budgetPartValidator = Joi.string().pattern(/^./);

export const getSchema = Joi.object({
    name: budgetPartValidator,
    description: budgetPartValidator,
    date: budgetPartValidator,
});

export const postSchema = Joi.object({
    name: budgetPartValidator,
    description: budgetPartValidator,
    date: budgetPartValidator,
});

export const patchSchema = Joi.object({
    name: budgetPartValidator,
    description: budgetPartValidator,
    date: budgetPartValidator,
});

export const removeSchema = Joi.object({
    name: budgetPartValidator,
    description: budgetPartValidator,
    date: budgetPartValidator,
});