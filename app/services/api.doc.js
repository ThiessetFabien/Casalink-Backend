import expressJSDocSwagger from 'express-jsdoc-swagger';

const options = {
  info: {
    version: '1.0.0',
    title: "CasaLink",
    description: "Gestion de planification familiale",
  },
  baseDir: import.meta.url.substring(7, import.meta.url.lastIndexOf('/')),

  filesPattern: '../**/*.js',

  swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE || '/api-docs',

  exposeApiDocs: true,
  apiDocsPath: '/api',
};

export default (app) => expressJSDocSwagger(app)(options);