import Joi from 'joi';

const taskPartValidator = Joi.string().pattern(/^./);
const category_idPartValidator = Joi.string().pattern(/^[1-9]+$/); // Regex to allow only digits

/**
* Response of API for a task data source
* @typedef {object} Task
* @property {string} name - Points are excluded
* @property {string} start_date - Points are excluded
* @property {string} end_date - Points are excluded
* @property {string} reward_point - Points are excluded
* @property {string} priority - Points are excluded
* @property {string} status - Points are excluded
* @property {string} description - Points are excluded
* @returns {ApiJsonSucces} - a task object
*/

/**
 * Task schema for the GET method
 */
export const getSchema = Joi.object({
    name: taskPartValidator,
    start_date: taskPartValidator,
    end_date: taskPartValidator,
    reward_point: taskPartValidator,
    priority: taskPartValidator,
    status: taskPartValidator,
    description: taskPartValidator,
    category_id: category_idPartValidator,
});

/**
 * Task schema for the POST method
 */
export const postSchema = Joi.object({
    name: taskPartValidator,
    start_date: taskPartValidator,
    end_date: taskPartValidator,
    reward_point: taskPartValidator,
    priority: taskPartValidator,
    status: taskPartValidator,
    description: taskPartValidator,
    category_id: category_idPartValidator,
});

/**
 * Task schema for the PATCH method
 */
export const patchSchema = Joi.object({
    name: taskPartValidator,
    start_date: taskPartValidator,
    end_date: taskPartValidator,
    reward_point: taskPartValidator,
    priority: taskPartValidator,
    status: taskPartValidator,
    description: taskPartValidator,
    category_id: category_idPartValidator,
});

/**
 * Task schema for the DELETE method
 */
export const removeSchema = Joi.object({
    name: taskPartValidator,
    start_date: taskPartValidator,
    end_date: taskPartValidator,
    reward_point: taskPartValidator,
    priority: taskPartValidator,
    status: taskPartValidator,
    description: taskPartValidator,
    category_id: category_idPartValidator,
});
