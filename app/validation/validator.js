import ApiError from '../errors/api.error.js';

/**
* validate a request data source against a schema
* @param {objet} schema - a joi schema
* @param {'query'|'params'|'body'} source - the request data source
* @returns {function} - an express middleware
*/

function validate(schema, source) {
    return (request, __, next) => {
        const { error } = schema.validate(request[source]);
        if (error) {
            const apiError = new ApiError(400, error.name, error.message);
        next(apiError);
        }
    next();
    };
 }
export default validate;