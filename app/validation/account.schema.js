import Joi from 'joi';

const accountPartValidator = Joi.string().pattern(/^./);
const home_idPartValidator = Joi.string().pattern(/^[1-9]+$/); // Regex to allow only digits
const emailPartValidator = Joi.string().email({ minDomainSegments: 3, tlds: { allow: ['com', 'net', 'fr'] } });
const passwordPartValidator = Joi.string()
.is().min(8)
.is().max(100)
.has().uppercase()
.has().lowercase()
.has().digits(1)
.has().symbols()
.has().not().spaces()
.is().not().oneOf(['Passw0rd', 'Password123']);


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
