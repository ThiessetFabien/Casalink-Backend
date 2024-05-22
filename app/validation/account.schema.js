import Joi from 'joi';

const accountPartValidator = Joi.string().pattern(/^./);
const home_idPartValidator = Joi.string().pattern(/^[1-9]+$/); // Regex to allow only digits
const emailPartValidator = Joi.string().email({ minDomainSegments: 3, tlds: { allow: ['com', 'net', 'fr'] } });
const passwordPartValidator = Joi.string()
    .min(8)
    .max(100)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/[0-9]/)
    .pattern(/[!@#$%^&*]/)
    .pattern(/^[^\s]*$/)
    .invalid('Passw0rd', 'Password123');

/**
* Response of API for a account data source
* @typedef {object} Account
* @property {string} lastname - Points are excluded
* @property {string} firstname - Points are excluded
* @property {string} role - Points are excluded
* @property {string} password - Between 8 characters and 100 characters, at least one uppercase letter, one lowercase letter, one number and one special character
* @property {number} home_id - Foreign key of home table
* @property {string} email - A string followed by an arobase followed by a string followed by " .net ", " .com " or " .fr "
* @returns {ApiJsonSucces} - an account object
*/

/**
 * Account schema for the GET method
 */

export const getSchema = Joi.object({
    lastname: accountPartValidator,
    firstname: accountPartValidator,
    role: accountPartValidator,
    password: accountPartValidator,
    home_id: home_idPartValidator,
    email: emailPartValidator,
});

/**
 * Account schema for the POST method
 */

export const postSchema = Joi.object({
    lastname: accountPartValidator,
    firstname: accountPartValidator,
    role: accountPartValidator,
    password: passwordPartValidator,
    home_id: home_idPartValidator,
    email: emailPartValidator,
});

/**
 * Account schema for the PATCH method
 */

export const patchSchema = Joi.object({
    lastname: accountPartValidator,
    firstname: accountPartValidator,
    role: accountPartValidator,
    password: passwordPartValidator,
    home_id: home_idPartValidator,
    email: emailPartValidator,
});

/**
 * Account schema for the DELETE method
 */

export const removeSchema = Joi.object({
    lastname: accountPartValidator,
    firstname: accountPartValidator,
    role: accountPartValidator,
    password: accountPartValidator,
    home_id: home_idPartValidator,
    email: emailPartValidator,
});
