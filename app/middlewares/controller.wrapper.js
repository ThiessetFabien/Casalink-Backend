import ApiError from '../errors/api.error.js';

const controllerWrapper = (controller) => async (req, res, next) => {
    try {
        await controller(req, res, next);
    } catch (error) {
        const apiError = new ApiError(500, error.name, error.message);
        next(apiError);
    }
};

export default controllerWrapper;
