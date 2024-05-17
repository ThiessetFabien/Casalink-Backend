import Joi from 'joi';

const taskPartValidator = Joi.string().pattern(/^./);
const category_idPartValidator = Joi.string().pattern(/^[1-9]+$/); // Regex to allow only digits
const namePartValidator = Joi.string().required();
const start_datePartValidator = Joi.date().required();
const end_datePartValidator = Joi.date().required();
const statusPartValidator = Joi.string().required();


export const getSchema = Joi.object({
    name: namePartValidator,
    start_date: start_datePartValidator,
    end_date: end_datePartValidator,
    reward_point: taskPartValidator,
    priority: taskPartValidator,
    status: statusPartValidator,
    description: taskPartValidator,
    category_id: category_idPartValidator,
});
export const postSchema = Joi.object({
    name: namePartValidator,
    start_date: start_datePartValidator,
    end_date: end_datePartValidator,
    reward_point: taskPartValidator,
    priority: taskPartValidator,
    status: statusPartValidator,
    description: taskPartValidator,
    category_id: category_idPartValidator,
});

export const patchSchema = Joi.object({
    name: namePartValidator,
    start_date: start_datePartValidator,
    end_date: end_datePartValidator,
    reward_point: taskPartValidator,
    priority: taskPartValidator,
    status: statusPartValidator,
    description: taskPartValidator,
    category_id: category_idPartValidator,
});

export const removeSchema = Joi.object({
    name: namePartValidator,
    start_date: start_datePartValidator,
    end_date: end_datePartValidator,
    reward_point: taskPartValidator,
    priority: taskPartValidator,
    status: statusPartValidator,
    description: taskPartValidator,
    category_id: category_idPartValidator,
});
