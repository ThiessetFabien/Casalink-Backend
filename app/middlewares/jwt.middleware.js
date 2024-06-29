/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import debugLib from 'debug';
import { config } from 'dotenv';

config({ path: '.env.development' });
import fs from 'fs';

const publicKey = fs.readFileSync(process.env.JWT_PUBLIC_KEY_PATH, 'utf8');

const debug = debugLib('app:jwtMiddleware');

const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  debug('Authorization Header:', authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const [scheme, token] = authHeader.split(' ');
  debug('Scheme:', scheme);
  debug('Token:', token);

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Invalid authorization format' });
  }

  try {
    const decoded = jwt.verify(token, publicKey);
    debug('Decoded JWT:', decoded);

    req.user = decoded;
    next();
  } catch (error) {
    debug('JWT verification error:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default jwtMiddleware;
