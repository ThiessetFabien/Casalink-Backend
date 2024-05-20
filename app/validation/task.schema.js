import Joi from 'joi';

const taskPartValidator = Joi.string().pattern(/^./);
const category_idPartValidator = Joi.string().pattern(/^[1-9]+$/); // Regex to allow only digits


export const getSchema = Joi.object({
    name: taskPartValidator,
    start_date: taskPartValidator,
    end_date: taskPartValidator,
    reward_point: taskPartValidator,
    priority: taskPartValidator,
    status: taskPartValidator,
    description: taskPartValidator,
    category_id: category_idPartValidator,
});
export const postSchema = Joi.object({
    name: taskPartValidator,
    start_date: taskPartValidator,
    end_date: taskPartValidator,
    reward_point: taskPartValidator,
    priority: taskPartValidator,
    status: taskPartValidator,
    description: taskPartValidator,
    category_id: category_idPartValidator,
});

export const patchSchema = Joi.object({
    name: taskPartValidator,
    start_date: taskPartValidator,
    end_date: taskPartValidator,
    reward_point: taskPartValidator,
    priority: taskPartValidator,
    status: taskPartValidator,
    description: taskPartValidator,
    category_id: category_idPartValidator,
});

export const removeSchema = Joi.object({
    name: taskPartValidator,
    start_date: taskPartValidator,
    end_date: taskPartValidator,
    reward_point: taskPartValidator,
    priority: taskPartValidator,
    status: taskPartValidator,
    description: taskPartValidator,
    category_id: category_idPartValidator,
});
