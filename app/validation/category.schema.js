import Joi from 'joi';

const categoryPartValidator = Joi.string().pattern(/^./).required();
const colorPartValidator = Joi.string().pattern(/rgba?\((?<r>[.\d]+)[, ]+(?<g>[.\d]+)[, ]+(?<b>[.\d]+)(?:\s?[,\/]\s?(?<a>[.\d]+%?))?\)/); // Regex to allow only rbg and rgba color codes

/**
 * Category schema for the POST method
 */

export const postSchema = Joi.object({
    name: categoryPartValidator,
    color: colorPartValidator,
});

/**
 * Category schema for the PATCH method
 */

export const patchSchema = Joi.object({
    name: categoryPartValidator,
    color: colorPartValidator,
});
