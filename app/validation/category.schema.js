import Joi from 'joi';

const categoryPartValidator = Joi.string().pattern(/^./).required();
const colorPartValidator = Joi.string().pattern(/rgba?\((?<r>[.\d]+)[, ]+(?<g>[.\d]+)[, ]+(?<b>[.\d]+)(?:\s?[,\/]\s?(?<a>[.\d]+%?))?\)/); // Regex to allow only rbg and rgba color codes

/**
<<<<<<< HEAD
=======
* Response of API for a category data source
* @typedef {object} Category
* @property {string} name.required - Points are excluded
<<<<<<< HEAD
* @property {string} color - Only rbg or rgba color codes
=======
* @property {string} color.required - Only rbg or rgba color codes
>>>>>>> ca128301cad4cc5294825b5f2a4717469eb3d5a9
* @returns {ApiJsonSucces} - a category object
*/

/**
 * Category schema for the GET method
 */

export const getSchema = Joi.object({
    name: categoryPartValidator,
    color: colorPartValidator,
});

/**
>>>>>>> docs/schema-joi
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
