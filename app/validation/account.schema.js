import Joi from 'joi';

const accountPartValidator = Joi.string().pattern(/^./);
const home_idPartValidator = Joi.string().pattern(/^[1-9]+$/); // Regex to allow only digits
const emailPartValidator = Joi.string().pattern(/^./);
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
 * Account schema for the GET method
 */

export const getSchema = Joi.object({
    lastname: accountPartValidator,
    firstname: accountPartValidator,
    role: accountPartValidator,
    password: accountPartValidator,
    confirmPassword: accountPartValidator,
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
    confirmPassword: accountPartValidator,
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
    confirmPassword: accountPartValidator,
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
    confirmPassword: accountPartValidator,
    home_id: home_idPartValidator,
    email: emailPartValidator,
});
