/* eslint-disable no-useless-escape */
import Joi from 'joi';

/**
* Response of API for a category data source
* @typedef {object} Category
* @property {string} name.required - Points are excluded
* @property {string} color - Only rbg or rgba color codes
* @returns {ApiJsonSucces} - a category object
*/
const categoryPartValidator = Joi.string().pattern(/^./).required();
const colorPartValidator = Joi.string().pattern(/(rgba?|RGB)\((?<r>[.\d]+)[, ]+(?<g>[.\d]+)[, ]+(?<b>[.\d]+)(?:\s?[,\/]\s?(?<a>[.\d]+%?))?\)/);

/**
 * Category schema for the GET method
 */

export const getSchema = Joi.object({
  name: categoryPartValidator,
  color: colorPartValidator,
});

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
