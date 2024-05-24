import Joi from 'joi';

const addressPartValidator = Joi.string().pattern(/^./);
const postalPartValidator = Joi.string().pattern(/^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/).required(); // Regex to allow only 5 digits
const cityPartValidator = Joi.string().pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/).required();
const countryPartValidator = Joi.string().pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/).required(); // Regex to allow only letters, spaces, apostrophes and hyphens


/**
 * Address schema for the POST method
 */

export const postSchema = Joi.object({
    street: addressPartValidator,
    city: cityPartValidator,
    additional_information: addressPartValidator,
    postal_code: postalPartValidator,
    country: countryPartValidator,
});

/**
 * Address schema for the PATCH method
 */

export const patchSchema = Joi.object({
    street: addressPartValidator,
    city: cityPartValidator,
    additional_information: addressPartValidator,
    postal_code: postalPartValidator,
    country: countryPartValidator,
});
