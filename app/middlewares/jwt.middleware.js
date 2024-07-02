/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import debugLib from 'debug';
import { config } from 'dotenv';

config({ path: '.env.development' });

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
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    debug('Decoded JWT:', decoded);

    req.user = decoded;
    next();
  } catch (error) {
    debug('JWT verification error:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default jwtMiddleware;