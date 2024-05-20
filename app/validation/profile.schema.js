import Joi from 'joi';

const profilePartValidator = Joi.string().pattern(/^./);
const user_idPartValidator = Joi.string().pattern(/^[1-9]+$/); // Regex to allow only digits
const emailPartValidator = Joi.string().email({ minDomainSegments: 3, tlds: { allow: ['com', 'net', 'fr'] } }).required();


export const getSchema = Joi.object({
    name: profilePartValidator,
    role: profilePartValidator,
    pin: profilePartValidator.pattern(/^[0-9]{4}$/),
    image: profilePartValidator,
    user_id: user_idPartValidator,
    score: profilePartValidator,
    birthdate: profilePartValidator
});
export const postSchema = Joi.object({
    name: profilePartValidator,
    role: profilePartValidator,
    pin: profilePartValidator,
    image: profilePartValidator,
    user_id: user_idPartValidator,
    score: profilePartValidator,
    birthdate: profilePartValidator

});

export const patchSchema = Joi.object({
    name: profilePartValidator,
    role: profilePartValidator,
    pin: profilePartValidator,
    image: profilePartValidator,
    user_id: user_idPartValidator,
    score: profilePartValidator,
    birthdate: profilePartValidator

});

export const removeSchema = Joi.object({
    name: profilePartValidator,
    role: profilePartValidator,
    pin: profilePartValidator,
    image: profilePartValidator,
    user_id: user_idPartValidator,
    score: profilePartValidator,
    birthdate: profilePartValidator

});
