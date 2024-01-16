
import jwt from 'jsonwebtoken';
import env from './validateEnv.util';
import mongoose from 'mongoose';

const generateToken = (payload: object, secret: string, options: object) => {
    return jwt.sign(payload, secret, options);
};

const generateAuthToken = (id: mongoose.Types.ObjectId) => {
    const accessToken = generateToken({ _id: id }, env.ACCESS_JWT_SECRET, {
        expiresIn: `${env.ACCESS_TOKEN_EXPIRES_IN_MINUTE * 60}s`,
    });
    const refreshToken = generateToken({ _id: id }, env.REFRESH_JWT_SECRET, {
        expiresIn: `${env.REFRESH_TOKEN_EXPIRES_IN_MINUTE * 60}s`,
    });
    return {
        accessToken,
        refreshToken,
    };
};
export default generateAuthToken;
