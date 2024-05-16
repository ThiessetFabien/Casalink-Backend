import logger from '../utils/logger.js';

/**
 * A api json error object
 * @typedef {object} ApiJsonError - Error response
 * @property {string} error.required - Error message
 * @example
 * {
 *  "error": "Bad request"
 * }
 */

export default (err, req, res, next) => {
  let { status, message } = err;
  const { code } = err;

  if (code === '23505') {
    status = 400;
    message = 'Resource already exists';
  }

  if (!status) {
    status = 500;
  }

  if (status === 500) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(err);
    }
    logger.error(err);
    message = 'Internal Server Error';
  }

  if (res.format === 'html') {
    return res.status(status).render('error', {
      httpStatus: status,
      message,
    });
  }

  return res.status(status).json({ error: message });
};