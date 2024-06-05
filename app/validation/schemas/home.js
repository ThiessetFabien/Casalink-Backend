import Joi from 'joi';
/**
 * Response of API for a home data source
 * @typedef {object} Home
 * @property {string} shopping_list - Points are excluded
 * @property {string} name.required - Points are excluded
 * @returns {ApiJsonSucces} - a home object
 */
const homePartValidator = Joi.string().pattern(/^./);

/**
 * Home schema for the POST method
 */
export const postSchema = Joi.object({
  shopping_list: homePartValidator,
  name: homePartValidator.required(),
});

/**
 * Home schema for the PATCH method
 */
export const patchSchema = Joi.object({
  shopping_list: homePartValidator,
  name: homePartValidator.required(),
});
