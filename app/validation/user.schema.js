import Joi from 'joi';
const userPartValidator = Joi.string().pattern(/^./);
export const getSchema = Joi.object({
    lastname: userPartValidator,
    firstname: userPartValidator,
    birthdate: userPartValidator,
    role: userPartValidator,
    pin: userPartValidator.pattern(/^[0-9]{4}$/),
    password: userPartValidator,
    email: userPartValidator,
    score: userPartValidator
});
export const postSchema = Joi.object({
    lastname: userPartValidator,
    firstname: userPartValidator,
    birthdate: userPartValidator,
    role: userPartValidator,
    pin: userPartValidator,
    password: userPartValidator,
    email: userPartValidator,
    score: userPartValidator
});

export const patchSchema = Joi.object({
    lastname: userPartValidator,
    firstname: userPartValidator,
    birthdate: userPartValidator,
    role: userPartValidator,
    pin: userPartValidator,
    password: userPartValidator,
    email: userPartValidator,
    score: userPartValidator
});

export const removeSchema = Joi.object({
    lastname: userPartValidator,
    firstname: userPartValidator,
    birthdate: userPartValidator,
    role: userPartValidator,
    pin: userPartValidator,
    password: userPartValidator,
    email: userPartValidator,
    score: userPartValidator
});