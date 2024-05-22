import Joi from 'joi';

const addressPartValidator = Joi.string().pattern(/^./);
const postalPartValidator = Joi.string().pattern(/^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/).required(); // Regex to allow only 5 digits
const cityPartValidator = Joi.string().pattern(/^[[:alpha:]]([-' ]?[[:alpha:]])*$/).required(); // Regex to allow only letters, spaces, apostrophes and hyphens
const countryPartValidator = Joi.string().pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/).required(); // Regex to allow only letters, spaces, apostrophes and hyphens

/**
* Response of API for a address data source
* @typedef {object} Address
* @property {string} street - Points are excluded
* @property {string} city.required - Apostrophes and hyphens are excluded
* @property {string} additional_information - Points are excluded
* @property {string} postal_code.required - 5 digits between 01000 and 98799 are required
* @property {string} country.required - Only letters, accents spaces, apostrophes and hyphens are required
* @returns {ApiJsonSucces} - an address object
*/

/**
 * Address schema for the GET method
 */

export const getSchema = Joi.object({
    street: addressPartValidator,
    city: cityPartValidator,
    additional_information: addressPartValidator,
    postal_code: postalPartValidator,
    country: countryPartValidator,
});

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

/**
 * Address schema for the DELETE method
 */

export const removeSchema = Joi.object({
    street: addressPartValidator,
    city: cityPartValidator,
    additional_information: addressPartValidator,
    postal_code: postalPartValidator,
    country: countryPartValidator,
});