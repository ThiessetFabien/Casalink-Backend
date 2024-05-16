import ApiError from '../errors/ApiError.js';

export default (controller) => async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      const apiError = new ApiError(500, error.name, error.message);
      next(apiError);
    }
  };