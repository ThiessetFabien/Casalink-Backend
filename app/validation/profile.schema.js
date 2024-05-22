import Joi from 'joi';

const profilePartValidator = Joi.string().pattern(/^./);
const account_idPartValidator = Joi.string().pattern(/^[1-9]+$/); // Regex to allow only digits
const emailPartValidator = Joi.string().email({ minDomainSegments: 3, tlds: { allow: ['com', 'net', 'fr'] } });

/**
* Response of API for a profil data source
* @typedef {object} Profil
* @property {string} name - Points are excluded
* @property {string} birthdate - Points are excluded
* @property {string} role - Points are excluded
* @property {string} pin - Fourth numbers are required
* @property {string} image - Points are excluded
* @property {string} email - A string followed by an arobase followed by a string followed by " .net ", " .com " or " .fr "
* @property {string} score - Points are excluded
* @returns {ApiJsonSucces} - a profil object
*/

/**
 * Profile schema for the GET method
 */
export const getSchema = Joi.object({
    name: profilePartValidator,
    role: profilePartValidator,
    pin: profilePartValidator.pattern(/^[0-9]{4}$/),
    image: profilePartValidator,
    account_id: account_idPartValidator,
    score: profilePartValidator,
    email: emailPartValidator,
    birthdate: profilePartValidator
});

/**
 * Profile schema for the POST method
 */
export const postSchema = Joi.object({
    name: profilePartValidator,
    role: profilePartValidator,
    pin: profilePartValidator,
    image: profilePartValidator,
    account_id: account_idPartValidator,
    score: profilePartValidator,
    email: emailPartValidator,
    birthdate: profilePartValidator
});

/**
 * Profile schema for the PATCH method
 */
export const patchSchema = Joi.object({
    name: profilePartValidator,
    role: profilePartValidator,
    pin: profilePartValidator,
    image: profilePartValidator,
    account_id: account_idPartValidator,
    score: profilePartValidator,
    email: emailPartValidator,
    birthdate: profilePartValidator
});

/**
 * Profile schema for the DELETE method
 */
export const removeSchema = Joi.object({
    name: profilePartValidator,
    role: profilePartValidator,
    pin: profilePartValidator,
    image: profilePartValidator,
    account_id: account_idPartValidator,
    score: profilePartValidator,
    email: emailPartValidator,
    birthdate: profilePartValidator
});
