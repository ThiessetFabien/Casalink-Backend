import accountController from "../controllers/account.controller.js";
import ApiError from '../errors/api.error.js';

const addSessionMiddleware = async (req, __, next) => {
  try {
    // Catch the accountId from the session
    const accountId = req.session.accountId;

    if (!accountId) {
      // if the account is not authenticated, respond with a 401 (Unauthorized) error
      throw new ApiError(401, 'Unauthorized', 'You must be logged in to access this resource');
    }

    // Find the account data by its id
    const accountData = await accountController.findaccountByIdWithoutPassword({ id: accountId
    }); 

    if (!accountData) {
      // if the account is not found, respond with a 404 (Not Found) error
      throw new ApiError(404, 'Not Found', 'The account does not exist');
    }

    // Add the account data to the request object
    req.account = accountData;

    // Continue to the next middleware
    next();
  } catch (error) {
    if(error instanceof ApiError) {
      // If the error is an instance of ApiError, pass it to the error handler middleware
      next(error);
    } else{
      // If the error is not an instance of ApiError, create a new ApiError object and pass it to the error handler middleware
      const apiError = new ApiError(500, error.name, error.message);
      next(apiError);
    }
  }
};

export default addSessionMiddleware;
