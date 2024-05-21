import Joi from 'joi';

const accountPartValidator = Joi.string().pattern(/^./);
const home_idPartValidator = Joi.string().pattern(/^[1-9]+$/); // Regex to allow only digits
const emailPartValidator = Joi.string().email({ minDomainSegments: 3, tlds: { allow: ['com', 'net', 'fr'] } });
const passwordPartValidator = Joi.string().min(8)
.min(8)
.max(100)
.pattern(new RegExp('[A-Z]'))
.pattern(new RegExp('[a-z]'))
.pattern(new RegExp('[0-9]'))
.pattern(new RegExp('[!@#\$%\^&\*]'))
.pattern(new RegExp('^[^\s]*$'))
.invalid('Passw0rd', 'Password123');

export const getSchema = Joi.object({
    lastname: accountPartValidator,
    firstname: accountPartValidator,
    role: accountPartValidator,
    password: accountPartValidator,
    home_id: home_idPartValidator,
    email: emailPartValidator,
});
export const postSchema = Joi.object({
    lastname: accountPartValidator,
    firstname: accountPartValidator,
    role: accountPartValidator,
    password: passwordPartValidator,
    home_id: home_idPartValidator,
    email: emailPartValidator,
});

export const patchSchema = Joi.object({
    lastname: accountPartValidator,
    firstname: accountPartValidator,
    role: accountPartValidator,
    password: passwordPartValidator,
    home_id: home_idPartValidator,
    email: emailPartValidator,
});

export const removeSchema = Joi.object({
    lastname: accountPartValidator,
    firstname: accountPartValidator,
    role: accountPartValidator,
    password: accountPartValidator,
    home_id: home_idPartValidator,
    email: emailPartValidator,
});
