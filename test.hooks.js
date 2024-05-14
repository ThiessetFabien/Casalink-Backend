import { config } from 'dotenv';
import { resolve } from 'path';
import { cwd } from 'process';
import index from './index.js';


let server;

export const mochaHooks = {
    beforeAll() {
        const PORT = process.env.PORT_TEST ?? 4000;
        server = index.listen(PORT);
        console.log('Serveur de test prêt sur le port', PORT);
    },
    afterAll() {
        server.close();
        console.log('Serveur de test arrêté');
    },
};
