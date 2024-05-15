import { debug } from 'console';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import path from "path";
const __dirname = path.dirname('./');

const options = {
  info: {
    version: '1.0.0',
    title: "CasaLink",
    description: "Gestion de planification familiale",
  },
  baseDir: __dirname,

  filesPattern: '../**/*.js',

  swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE || '/api-docs',

  exposeApiDocs: true,
  apiDocsPath: '/api-docs',
};

/**
 * Swagger middleware factory
 * @param {object} app Express application
 * @returns {object} Express JSDoc Swagger middleware that create web documentation
 */

export default (app) => expressJSDocSwagger(app)(options);