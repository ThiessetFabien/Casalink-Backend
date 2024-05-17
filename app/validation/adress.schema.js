import Joi from 'joi';

const addressPartValidator = Joi.string().pattern(/^./);
const postalPartValidator = Joi.string().pattern(/^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/).required(); // Regex to allow only 5 digits
const cityPartValidator = Joi.string().pattern(/^[[:alpha:]]([-' ]?[[:alpha:]])*$/).required(); // Regex to allow only letters, spaces, apostrophes and hyphens
const countryPartValidator = Joi.string().pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/).required(); // Regex to allow only letters, spaces, apostrophes and hyphens


export const getSchema = Joi.object({
    street: addressPartValidator,
    city: cityPartValidator,
    additional_information: addressPartValidator,
    postal_code: postalPartValidator,
    country: countryPartValidator,
});

export const postSchema = Joi.object({
    street: addressPartValidator,
    city: cityPartValidator,
    additional_information: addressPartValidator,
    postal_code: postalPartValidator,
    country: countryPartValidator,
});

export const patchSchema = Joi.object({
    street: addressPartValidator,
    city: cityPartValidator,
    additional_information: addressPartValidator,
    postal_code: postalPartValidator,
    country: countryPartValidator,
});

export const removeSchema = Joi.object({
    street: addressPartValidator,
    city: cityPartValidator,
    additional_information: addressPartValidator,
    postal_code: postalPartValidator,
    country: countryPartValidator,
});