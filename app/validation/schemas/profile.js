/* eslint-disable camelcase */
import Joi from 'joi';
/**
 * Response of API for a profile data source
 * @typedef {object} Profile
 * @property {string} name - All caracters accepted
 * @property {string} role - All caracters accepted
 * @property {number} pin - All caracters accepted
 * @property {string} image - All caracters accepted
 * @property {number} account_id - All caracters accepted
 * @property {number} score - All caracters accepted
 * @property {string} email - A string followed by " .net ", " .com " or " .fr ".
 * @property {string} birthdate - All caracters accepted
 * @returns {ApiJsonSucces} - a profile object
 */
const profilePartValidator = Joi.string().pattern(/^./).allow('');
const pinPartValidator = Joi.number().integer().allow('', null);
const scorePartValidator = Joi.number().integer();
const account_idPartValidator = Joi.number().integer();
const emailPartValidator = Joi.string()
  .email()
  .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.(fr|com|net)$/)
  .allow('', null);

/**
 * Profile schema for the POST method
 */
export const postSchema = Joi.object({
  name: profilePartValidator,
  role: profilePartValidator,
  pin: pinPartValidator,
  image: profilePartValidator,
  account_id: account_idPartValidator,
  score: scorePartValidator,
  email: emailPartValidator,
  birthdate: profilePartValidator,
});

/**
 * Profile schema for the PATCH method
 */
export const patchSchema = Joi.object({
  name: profilePartValidator,
  role: profilePartValidator,
  pin: pinPartValidator,
  image: profilePartValidator,
  account_id: account_idPartValidator,
  score: scorePartValidator,
  email: emailPartValidator || null,
  birthdate: profilePartValidator,
});
