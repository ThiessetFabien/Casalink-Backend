/* eslint-disable import/extensions */
import ApiError from '../errors/api.error.js';

const controllerWrapper = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    next(new ApiError(500, error.name, error.message));
  }
};

export default controllerWrapper;
