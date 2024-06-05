import Joi from 'joi';

/**
* Response of API for a task data source
* @typedef {object} Task
* @property {string} name - Points are excluded
* @property {string} start_date - Timestamp ISO 8601 required
* @property {string} end_date - Timestamp ISO 8601 required
* @property {string} reward_point - Points are excluded
* @property {string} priority - Points are excluded
* @property {string} status - Points are excluded
* @property {string} description - Points are excluded
* @returns {ApiJsonSucces} - a task object
*/
const taskPartValidator = Joi.string().pattern(/^./);
const profileIDPartValidator = Joi.number().integer();
const timestampPartValidator = Joi.date().iso();
const rewardAndCategoryPartValidator = Joi.number().integer();

/**
 * Task schema for the GET method
 */
export const getSchema = Joi.object({
  name: taskPartValidator.required(),
  start_date: timestampPartValidator.required(),
  end_date: timestampPartValidator,
  reward_point: rewardAndCategoryPartValidator,
  priority: taskPartValidator,
  status: taskPartValidator,
  description: taskPartValidator,
  category_id: rewardAndCategoryPartValidator,
});

/**
 * Task schema for the POST method
 */
export const postSchema = Joi.object({
  name: taskPartValidator.required(),
  start_date: timestampPartValidator.required(),
  end_date: timestampPartValidator,
  reward_point: rewardAndCategoryPartValidator,
  priority: taskPartValidator,
  status: taskPartValidator,
  description: taskPartValidator,
  category_id: rewardAndCategoryPartValidator,
  account_id: rewardAndCategoryPartValidator,
});

/**
 * Task schema for the PATCH method
 */
export const patchSchema = Joi.object({
  name: taskPartValidator.required(),
  start_date: timestampPartValidator.required(),
  end_date: timestampPartValidator,
  reward_point: rewardAndCategoryPartValidator,
  priority: taskPartValidator,
  status: taskPartValidator,
  description: taskPartValidator,
  category_id: rewardAndCategoryPartValidator,
  profile_id: profileIDPartValidator,
});
