import Joi from 'joi';

const categoryPartValidator = Joi.string().pattern(/^./);

export const getSchema = Joi.object({
    name: categoryPartValidator,
    color: categoryPartValidator,
});

export const postSchema = Joi.object({
    name: categoryPartValidator,
    color: categoryPartValidator,
});

export const patchSchema = Joi.object({
    name: categoryPartValidator,
    color: categoryPartValidator,
});

export const removeSchema = Joi.object({
    name: categoryPartValidator,
    color: categoryPartValidator,
});