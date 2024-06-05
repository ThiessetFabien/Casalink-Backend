/* eslint-disable new-cap */
import pg from 'pg';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';

const pgSession = connectPgSimple(session);
const { Pool } = pg;

const client = new Pool({
  password: process.env.PGPASSWORD,
});
client.connect();
const sessionMiddleware = session({
  store: new pgSession({
    pool: client,
    tableName: 'account_session',
    createTableIfMissing: true,
  }),

  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  cache: {
    maxAge: 24 * 60 * 60 * 1000,
  },
  resave: false,
  cookie: { secure: false },
});

export default sessionMiddleware;
