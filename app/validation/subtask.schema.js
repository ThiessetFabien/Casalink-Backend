import Joi from 'joi';

const subtaskPartValidator = Joi.string().pattern(/^./);
const task_idPartValidator = Joi.string().pattern(/^[1-9]+$/).required(); // Regex to allow only digits
const namePartValidator = Joi.string().required();

export const getSchema = Joi.object({
    name: namePartValidator,
    description: subtaskPartValidator,
    task_id: task_idPartValidator,
});

export const postSchema = Joi.object({
    name: namePartValidator,
    description: subtaskPartValidator,
    task_id: task_idPartValidator,
});

export const patchSchema = Joi.object({
    name: namePartValidator,
    description: subtaskPartValidator,
    task_id: task_idPartValidator,
});

export const removeSchema = Joi.object({
    name: namePartValidator,
    description: subtaskPartValidator,
    task_id: task_idPartValidator,
});