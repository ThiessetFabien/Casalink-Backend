import Joi from 'joi';

const adressPartValidator = Joi.string().pattern(/^./);
const postalPartValidator = Joi.string().pattern(/^./);

export const getSchema = Joi.object({
    street: adressPartValidator,
    city: adressPartValidator,
    additional_information: adressPartValidator,
    postal_code: postalPartValidator,
    country: adressPartValidator,
});

export const postSchema = Joi.object({
    street: adressPartValidator,
    city: adressPartValidator,
    additional_information: adressPartValidator,
    postal_code: postalPartValidator,
    country: adressPartValidator,
});

export const patchSchema = Joi.object({
    street: adressPartValidator,
    city: adressPartValidator,
    additional_information: adressPartValidator,
    postal_code: postalPartValidator,
    country: adressPartValidator,
});

export const removeSchema = Joi.object({
    street: adressPartValidator,
    city: adressPartValidator,
    additional_information: adressPartValidator,
    postal_code: postalPartValidator,
    country: adressPartValidator,
});