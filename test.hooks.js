/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import { config } from 'dotenv';
import index from './index.js';

config({ path: './.env.test' });
let server;
export const mochaHooks = {
  beforeAll(done) {
    const PORT = process.env.PORT ?? 4000;
    // if the port is already in use and boot on another unused port
    server = index.listen(PORT, () => {
      console.log(`🚀 Test server started on port ${PORT}`);
      done();
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`🔄 Port ${PORT} is in use, trying another port...`);
        server = index.listen(0, () => {
          console.log(`🧘 Test server started on port ${server.address().port}`);
          done();
        });
      } else {
        done(err);
      }
    });
  },
  afterAll(done) {
    if (server) {
      server.close(() => {
        console.log('🛑 Test server closed');
        done();
      });
    } else {
      done();
    }
  },
};
