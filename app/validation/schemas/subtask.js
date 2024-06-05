/* eslint-disable camelcase */
import Joi from 'joi';
/**
 * Response of API for a subtask data source
 * @typedef {object} Subtask
 * @property {string} name - Points are excluded
 * @property {string} description - Points are excluded
 * @property {number} task_id - Points are excluded
 * @returns {ApiJsonSucces} - a subtask object
 */
const subtaskPartValidator = Joi.string().pattern(/^./);
const task_idPartValidator = Joi.string().pattern(/^[1-9]+$/).required(); // Regex to allow only digits

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
