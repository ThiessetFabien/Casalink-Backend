/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import { config } from 'dotenv';
import logger from '../utils/logger.js';
import ApiError from '../errors/api.error.js';
import DbError from '../errors/dbError.js';

config({ path: `.env.${process.env.NODE_ENV}` });

/**
 * A api json error object
 * @typedef {object} ApiJsonError - Error response
 * @property {string} error.required - Error message
 * @param {Error} err - Error object
 * @param {Request} _ - Request object
 * @param {Response} res - Response object
 * @param {NextFunction} next - Next function
 * @example
 * {
 *  "status": 400,
 *  "error": "Bad request",
 *  "message": "Resource already exists"
 * }
 */

export default (err, __, res, next) => {
  let { status, message } = err;
  const { code } = err;

  // Error handling of specific errors
  if (err instanceof ApiError) {
    status = err.status || 500;
    message = err.message || 'Internal Server Error';
  } else if (err instanceof DbError) {
    status = 500;
    message = 'Database error occurred';
  }

  // Error handling of specific database errors
  if (code === '23505') {
    status = 400;
    message = 'Resource already exists';
  }

  // Error handling of 404 errors
  if (status === 404) {
    message = 'Resource not found';
  }

  // Error handling of 401 errors
  if (status === 401) {
    message = 'Unauthorized';
  }

  // Error handling of 403 errors
  if (status === 403) {
    message = 'Forbidden';
  }

  // Error handling of 500 errors
  if (status === 500) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(err);
    }
    logger.error(err);
    message = 'Internal Server Error';
  }
  return res.status(status).json({ error: message });
};
