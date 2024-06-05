/* eslint-disable import/extensions */
import accountController from '../controllers/account.controller.js';
import ApiError from '../errors/api.error.js';

const addSessionMiddleware = async (req, __, next) => {
  try {
    const { accountId } = req.session;
    if (!accountId) {
      throw new ApiError(401, 'Unauthorized', 'You must be logged in to access this resource');
    }
    const accountData = await accountController.findaccountByIdWithoutPassword({ id: accountId });
    if (!accountData) {
      throw new ApiError(404, 'Not Found', 'The account does not exist');
    }
    req.account = accountData;
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      next(error);
    } else {
      const apiError = new ApiError(500, error.name, error.message);
      next(apiError);
    }
  }
};

export default addSessionMiddleware;
