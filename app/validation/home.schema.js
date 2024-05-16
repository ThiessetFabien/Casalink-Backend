import Joi from 'joi';

const homePartValidator = Joi.string().pattern(/^./);

export const getSchema = Joi.object({
    shopping_list: homePartValidator,
    name: homePartValidator,
});

export const postSchema = Joi.object({
    shopping_list: homePartValidator,
    name: homePartValidator,
});

export const patchSchema = Joi.object({
    shopping_list: homePartValidator,
    name: homePartValidator,
});

export const removeSchema = Joi.object({
    shopping_list: homePartValidator,
    name: homePartValidator,
});
