import Joi from 'joi';

/**
 * Response of API for a address data source
 * @typedef {object} Address
 * @property {string} street - Points are excluded
 * @property {string} city - Spaces, accents and hyphens are allowed
 * @property {string} additional_information - Points are excluded
 * @property {string} postal_code - 5 digits between 01000 and 98999
 * @property {string} country - Spaces, accents and hyphens are allowed
 * @returns {ApiJsonSucces} - an address object
 */

const addressPartValidator = Joi.string().pattern(/^./);
const postalPartValidator = Joi.string().pattern(/^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/).required(); // Regex to allow only 5 digits
const cityPartValidator = Joi.string().pattern(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]+$/).required();
const cityAndCountryPartValidator = Joi.string().pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/).required(); // Regex to allow only letters, spaces, apostrophes and hyphens
/**
 * Address schema for the POST method
 */

export const postSchema = Joi.object({
    street: addressPartValidator,
    city: cityPartValidator.required(),
    additional_information: addressPartValidator,
    postal_code: postalPartValidator.required(),
    country: cityAndCountryPartValidator.required(),
});

/**
 * Address schema for the PATCH method
 */

export const patchSchema = Joi.object({
    street: addressPartValidator,
    city: cityPartValidator.required(),
    additional_information: addressPartValidator,
    postal_code: postalPartValidator.required(),
    country: cityAndCountryPartValidator.required(),
});