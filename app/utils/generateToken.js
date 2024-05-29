import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config({ path: `.env.development` });

const generateToken = (user) => {
    const payload = {
        userId: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
        email: user.email
    };

    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: '1 day'  // Token expiration time
    };

    const token = jwt.sign(payload, secret, options);
    return token;
};

// Example user object
// const user = {
//     id: 3,
//     name: 'popo',
//     role: 'adult',
//     email: 'popo@example.com'
// };

// const token = generateToken(user);
// console.log('Generated JWT:', token);

export default generateToken;