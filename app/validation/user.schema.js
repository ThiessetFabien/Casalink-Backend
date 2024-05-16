import Joi from 'joi';
const userPartValidator = Joi.string().pattern(/^./);
export const getSchema = Joi.object({
    name: userPartValidator,
    start_date: userPartValidator,
    end_date: userPartValidator,
    reward_point: userPartValidator,
    priority: userPartValidator,
    status: userPartValidator,
    description: userPartValidator,
    category_id: userPartValidator,
});
export const postSchema = Joi.object({
    name: userPartValidator,
    start_date: userPartValidator,
    end_date: userPartValidator,
    reward_point: userPartValidator,
    priority: userPartValidator,
    status: userPartValidator,
    description: userPartValidator,
    category_id: userPartValidator,
});

export const patchSchema = Joi.object({
    name: userPartValidator,
    start_date: userPartValidator,
    end_date: userPartValidator,
    reward_point: userPartValidator,
    priority: userPartValidator,
    status: userPartValidator,
    description: userPartValidator,
    category_id: userPartValidator,
});

export const removeSchema = Joi.object({
    name: userPartValidator,
    start_date: userPartValidator,
    end_date: userPartValidator,
    reward_point: userPartValidator,
    priority: userPartValidator,
    status: userPartValidator,
    description: userPartValidator,
    category_id: userPartValidator,
});
