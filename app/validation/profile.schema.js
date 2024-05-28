import Joi from 'joi';

const profilePartValidator = Joi.string().pattern(/^./);
const pinPartValidator = Joi.number().integer();
const scorePartValidator = Joi.number().integer();
const account_idPartValidator = Joi.number().integer();
const emailPartValidator = Joi.string()
    .email()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.(fr|com|net)$/)
    .allow('');

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
    birthdate: profilePartValidator
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
    email: emailPartValidator,
    birthdate: profilePartValidator
});
