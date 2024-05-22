import Joi from 'joi';

const subtaskPartValidator = Joi.string().pattern(/^./);
const task_idPartValidator = Joi.string().pattern(/^[1-9]+$/).required(); // Regex to allow only digits

/**
* Response of API for a substask data source
* @typedef {object} Substask
* @property {string} name - Points are excluded
* @property {string} description - Points are excluded
* @property {string} task_id - Foreing key to task
* @returns {ApiJsonSucces} - a substask object
*/

/**
 * Subtask schema for the GET method
 */
export const getSchema = Joi.object({
    name: subtaskPartValidator,
    description: subtaskPartValidator,
    task_id: task_idPartValidator,
});

/**
 * Subtask schema for the POST method
 */
export const postSchema = Joi.object({
    name: subtaskPartValidator,
    description: subtaskPartValidator,
    task_id: task_idPartValidator,
});

/**
 * Subtask schema for the PATCH method
 */
export const patchSchema = Joi.object({
    name: subtaskPartValidator,
    description: subtaskPartValidator,
    task_id: task_idPartValidator,
});

/**
 * Subtask schema for the DELETE method
 */
export const removeSchema = Joi.object({
    name: subtaskPartValidator,
    description: subtaskPartValidator,
    task_id: task_idPartValidator,
});