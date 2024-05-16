import Joi from 'joi';

const taskPartValidator = Joi.string().pattern(/^./);

export const getSchema = Joi.object({
    name: taskPartValidator,
    start_date: taskPartValidator,
    end_date: taskPartValidator,
    reward_point: taskPartValidator,
    priority: taskPartValidator,
    status: taskPartValidator,
    description: taskPartValidator,
    category_id: taskPartValidator,
});
export const postSchema = Joi.object({
    name: taskPartValidator,
    start_date: taskPartValidator,
    end_date: taskPartValidator,
    reward_point: taskPartValidator,
    priority: taskPartValidator,
    status: taskPartValidator,
    description: taskPartValidator,
    category_id: taskPartValidator,
});

export const patchSchema = Joi.object({
    name: taskPartValidator,
    start_date: taskPartValidator,
    end_date: taskPartValidator,
    reward_point: taskPartValidator,
    priority: taskPartValidator,
    status: taskPartValidator,
    description: taskPartValidator,
    category_id: taskPartValidator,
});

export const removeSchema = Joi.object({
    name: taskPartValidator,
    start_date: taskPartValidator,
    end_date: taskPartValidator,
    reward_point: taskPartValidator,
    priority: taskPartValidator,
    status: taskPartValidator,
    description: taskPartValidator,
    category_id: taskPartValidator,
});