// Load environment variables
import { config } from 'dotenv';
config();

// Import dependencies
import router from './app/routers/router.js';
import createDoc from './app/services/api.doc.js';
import logger from './app/utils/logger.js';
import debugLib from 'debug';

import express, { urlencoded } from 'express';

const debug = debugLib('app:server');

const app = express();

app.use(express.json());

// Setup body parser
app.use(urlencoded({ extended: true }));

app.use((request, _, next) => {
    logger.http(req.url, { ip: request.ip, userAgent: request.headers['user-agent'] });
    next();
});

createDoc(app);

// Starting server
const PORT = process.env.PORT ?? 3000;

app.use(router);
    
if (process.env.NODE_ENV === 'production') {
    app.listen(PORT, () => debug(`Server ready: http://localhost:${PORT})`));

} else {
    app.listen(PORT, () => debug(`Server ready in development mode: http://localhost:${PORT})`));
};

export default app;