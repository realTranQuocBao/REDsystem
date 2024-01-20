import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import UserModel from '../models/user.model';
import env from '../utils/validateEnv.util';
import mongoose from 'mongoose';
import { IToken } from '../interfaces/IAuth.interface';


const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return next(createHttpError(403, 'Not authorized, token failed'));
        }


        const jwtPayload = <any>jwt.verify(token, env.ACCESS_JWT_SECRET);

        console.log("token", jwtPayload);
        const userId = (jwtPayload as IToken)._id || null;

        if (!mongoose.isValidObjectId(userId)) {
            return next(createHttpError(403, 'Not authorized, token failed'));
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return next(createHttpError(403, 'Not authorized, token failed'));
        }

        res.locals.jwtPayload = jwtPayload;
        res.locals.user = user;

        return next();
    } catch (error) {
        return next(error);
    }
};

const admin = (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.user?.isAdmin) {
        next();
    } else {
        throw createHttpError(403, "Not authorized as an Admin");
    }
};

export { auth, admin };
