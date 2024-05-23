import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config({ path: `.env.development` });

const payload = {
    userId: 1,
    permissions: ['required-permission']
};

const secret = process.env.JWT_SECRET;
const options = {
    expiresIn: '1day'
};

const token = jwt.sign(payload, secret, options);
console.log('Generated JWT:', token);

