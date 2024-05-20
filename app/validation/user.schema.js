import Joi from 'joi';

const userPartValidator = Joi.string().pattern(/^./);
const home_idPartValidator = Joi.string().pattern(/^[1-9]+$/); // Regex to allow only digits
const emailPartValidator = Joi.string().email({ minDomainSegments: 3, tlds: { allow: ['com', 'net', 'fr'] } });


export const getSchema = Joi.object({
    lastname: userPartValidator,
    firstname: userPartValidator,
    role: userPartValidator,
    pin: userPartValidator.pattern(/^[0-9]{4}$/),
    password: userPartValidator,
    home_id: home_idPartValidator,
    email: emailPartValidator,
});
export const postSchema = Joi.object({
    lastname: userPartValidator,
    firstname: userPartValidator,
    role: userPartValidator,
    pin: userPartValidator,
    password: userPartValidator,
    home_id: home_idPartValidator,
    email: emailPartValidator,
});

export const patchSchema = Joi.object({
    lastname: userPartValidator,
    firstname: userPartValidator,
    role: userPartValidator,
    pin: userPartValidator,
    password: userPartValidator,
    home_id: home_idPartValidator,
    email: emailPartValidator,
});

export const removeSchema = Joi.object({
    lastname: userPartValidator,
    firstname: userPartValidator,
    role: userPartValidator,
    pin: userPartValidator,
    password: userPartValidator,
    home_id: home_idPartValidator,
    email: emailPartValidator,
});
