import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config({ path: '.env.development' });
import fs from 'fs';

const privateKey = fs.readFileSync(process.env.JWT_PRIVATE_KEY_PATH, 'utf8');

const generateToken = (user) => {
  const payload = {
    userId: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
    email: user.email,
  };
  
  const secret = process.env.JWT_SECRET;
  
  const options = {
    expiresIn: '2 hours', // Token expiration time
    algorithm: 'RS256',
  };

  const token = jwt.sign(payload, privateKey, options);
  return token;
};

export default generateToken;
