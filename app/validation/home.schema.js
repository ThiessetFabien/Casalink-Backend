import Joi from 'joi';

const homePartValidator = Joi.string().pattern(/^./);

/**
 * Home schema for the GET method
 */
export const getSchema = Joi.object({
    shopping_list: homePartValidator,
    name: homePartValidator,
});

/**
 * Home schema for the POST method
 */
export const postSchema = Joi.object({
    shopping_list: homePartValidator,
    name: homePartValidator,
});

/**
 * Home schema for the PATCH method
 */
export const patchSchema = Joi.object({
    shopping_list: homePartValidator,
    name: homePartValidator,
});

/**
 * Home schema for the DELETE method
 */
export const removeSchema = Joi.object({
    shopping_list: homePartValidator,
    name: homePartValidator,
});
