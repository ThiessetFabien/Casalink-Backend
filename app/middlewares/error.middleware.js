import logger from '../utils/logger.js';
import ApiError from '../errors/api.error.js';
import DbError from '../errors/db.error.js'; 

/**
 * A api json error object
 * @typedef {object} ApiJsonError - Error response
 * @property {string} error.required - Error message
 * @example
 * {
 *  "error": "Bad request"
 * }
 */

export default (err, __, res, next) => {
  let { status, message } = err;
  const { code } = err;

  // Gestion des erreurs spécifiques
  if (err instanceof ApiError) {
    status = err.status;
    message = err.message;
  } else if (err instanceof DbError) {
    status = 500;
    message = 'Database error occurred';
  } else if (code === '23505') {
    // Gestion des erreurs de duplication de base de données
    status = 400;
    message = 'Resource already exists';
  } else if (err.status === 404) {
    // Gestion des erreurs 404
    status = 404;
    message = 'Resource not found';
  } else if (err.status === 401) {
    // Gestion des erreurs 401
    status = 401;
    message = 'Unauthorized';
  } else if (err.status === 403) {
    // Gestion des erreurs 403
    status = 403;
    message = 'Forbidden';
  }


  // Gestion des erreurs 500 en environnement de développement
  if (status === 500) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(err);
    }
    logger.error(err);
    message = 'Internal Server Error';
  }
  res.status(status).json({ error: message });
};