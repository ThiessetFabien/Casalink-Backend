import Joi from 'joi';

const profilePartValidator = Joi.string().pattern(/^./);
const account_idPartValidator = Joi.string().pattern(/^[1-9]+$/); // Regex to allow only digits
const emailPartValidator = Joi.string().email({ minDomainSegments: 3, tlds: { allow: ['com', 'net', 'fr'] } });


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
