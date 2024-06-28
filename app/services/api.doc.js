import expressJSDocSwagger from 'express-jsdoc-swagger';
import { config } from 'dotenv';
config({ path: '.env' });

const PORT = process.env.PORT || 3000;
const VERSION = process.env.VERSION || 1;

import { config } from 'dotenv';
config({ path: '.env' });

const options = {
  info: {
    version: '1.0.0',
    title: 'CasaLink',
    description: 'Gestion de planification familiale',
  },
  servers: [
    {
      url: `http://localhost:${PORT}/api/v${VERSION}`,
      description: 'Development server',
    },
    {
      url: 'https://casalink-back.vercel.app',
      description: 'Production server',
    }
  ],
  baseDir: './app/routers',

  filesPattern: '../**/*.js',

  swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE || '/api-docs',

  exposeApiDocs: true,
  apiDocsPath: '/api-docs',
};

/**
 * Swagger middleware factory
 * @summary Create a swagger middleware
 * @param {object} app Express application
 * @returns {object} Express JSDoc Swagger middleware that create web documentation
 */

export default (app) => expressJSDocSwagger(app)(options);
