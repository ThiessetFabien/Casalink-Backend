import Joi from 'joi';

const categoryPartValidator = Joi.string().pattern(/^./).required();
const colorPartValidator = Joi.string().pattern(/rgba?\((?<r>[.\d]+)[, ]+(?<g>[.\d]+)[, ]+(?<b>[.\d]+)(?:\s?[,\/]\s?(?<a>[.\d]+%?))?\)/); // Regex to allow only rbg and rgba color codes

export const getSchema = Joi.object({
    name: categoryPartValidator,
    color: colorPartValidator,
});

export const postSchema = Joi.object({
    name: categoryPartValidator,
    color: colorPartValidator,
});

export const patchSchema = Joi.object({
    name: categoryPartValidator,
    color: colorPartValidator,
});

export const removeSchema = Joi.object({
    name: categoryPartValidator,
    color: colorPartValidator,
});