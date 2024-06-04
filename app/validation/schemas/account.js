import Joi from 'joi';

/**
* Response of API for a account data source
* @typedef {object} Account
* @property {string} lastname - Points are excluded
* @property {string} firstname - Points are excluded
* @property {string} role - Points are excluded
* @property {string} password - Password of the account. Should be between 8 and 100 characters, and contain at least one uppercase letter, one lowercase letter, one number, and one special character
* @property {string} confirmPassword - Should match the password field
* @property {string} email - A string followed by an arobase followed by a string followed by " .net ", " .com " or " .fr ". Should follow the format example@example.com
* @returns {ApiJsonSucces} - an account object
*/

const accountPartValidator = Joi.string().pattern(/^./);
const emailPartValidator = Joi.string()
    .email()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.(fr|com|net)$/);
const passwordPartValidator = Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\w)(?=\S+$).{8,}$/);

/**
 * Account schema for the POST method
 */
export const postSchema = Joi.object({
    lastname: accountPartValidator,
    firstname: accountPartValidator,
    password: passwordPartValidator,
    confirmPassword: passwordPartValidator,
    role:accountPartValidator,
    email: emailPartValidator,
});

/**
 * Account schema for the PATCH method
 */
export const patchSchema = Joi.object({
    lastname: accountPartValidator,
    firstname: accountPartValidator,
    password: passwordPartValidator,
    confirmPassword: passwordPartValidator,
    role:accountPartValidator,
    email: emailPartValidator,
});