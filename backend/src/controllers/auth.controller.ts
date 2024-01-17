import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import apiResponseService from "../services/apiResponse.service";
import { IForgotPasswordBody, IResetPasswordBody, ISignInBody, ISignUpBody } from "../interfaces/IUser.interface";
import UserModel from "../models/user.model";
import ResetPasswordModel from "../models/resetPassword.model";
import env from "../utils/validateEnv.util";
import mongoose from "mongoose";
import generateAuthToken from "../utils/generateToken.util";

/**
 * GET AUTHENTICATED INFORMATION 
 */
const getAuthenInfor: RequestHandler = async (req, res, next) => {
    // Get the authenticated user id
    const userId = res.locals?.jwtPayload?._id;

    try {

        if (!mongoose.isValidObjectId(userId)) {
            throw createHttpError(403, 'Not authorized, token failed');
        }

        const user = await UserModel.findById(userId)
            .populate('createdBy', '_id name email')
            .populate('updatedBy', '_id name email')
            .exec();
        if (!user) {
            throw createHttpError(403, 'Not authorized, token failed');
        }

        res.status(200).json(apiResponseService.success(
            user,
            200,
            "Get authenticated information successfully!"
        ));
    } catch (error) {
        next(error);
    }
}

/**
 * SIGN UP
 */
const signUp: RequestHandler<unknown, unknown, ISignUpBody, unknown> = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const passwordRaw = req.body.password;
    const isAdmin = req.body.isAdmin;
    const isDisabled = req.body.isDisabled;

    try {
        if (!name || !email || !passwordRaw) {
            throw createHttpError(400, "Missing parameter(s)!");
        }

        const existingUser = await UserModel.findOne({ email: email }).exec();
        if (existingUser) {
            throw createHttpError(400, "This email has been registered, please log in!");
        }

        const passwordHashed = await bcrypt.hash(passwordRaw, 10);

        const newUser = await UserModel.create({
            name: name,
            email: email,
            password: passwordHashed,
            isAdmin: isAdmin,
            isDisabled: isDisabled,
        });

        res.status(201).json(apiResponseService.success(
            newUser,
            201,
            "User registered successfully!"
        ));
    } catch (error) {
        next(error);
    }
}

/**
 * SIGN IN
 */
const signIn: RequestHandler<unknown, unknown, ISignInBody, unknown> = async (req, res, next) => {

    const email = req.body.email;
    const passwordRaw = req.body.password;

    try {
        if (!email || !passwordRaw) {
            throw createHttpError(400, "Missing login information!");
        }

        const user = await UserModel.findOne({ email }).select("+password").exec();
        if (!user) {
            throw createHttpError(401, "Invalid credentials! Email or password is wrong, please try again!");
        }

        const passwordMatch = await bcrypt.compare(passwordRaw, user.password);
        if (!passwordMatch) {
            // Warning of failed login! -> ex: email, sms,...
            throw createHttpError(401, "Invalid credential! Email or password is wrong, please try again!!");
        }

        const token = generateAuthToken(user._id);
        res.status(200).json(apiResponseService.success(
            {
                ...user.toObject(),
                accessToken: token.accessToken,
                refreshToken: token.refreshToken
            },
            200,
            "Sign in successfully!"
        ));
    } catch (error) {
        next(error);
    }
}

/**
 * SIGN OUT
 */
const signOut: RequestHandler = async (req, res, next) => {

    try {
        res.status(200).json(apiResponseService.success(
            null,
            200,
            "Sign out successfully!"
        ));
    } catch (error) {
        next(error);
    }
}

/**
 * FORGOT PASSWORD
 */
const forgotPassword: RequestHandler<unknown, unknown, IForgotPasswordBody, unknown> = async (req, res, next) => {

    const email = req.body.email;

    try {
        if (!email) {
            throw createHttpError(400, "Missing parameter(s)!");
        }

        const user = await UserModel.findOne({ email }).exec();
        const lastResetPassword = await ResetPasswordModel.findOne({ email }).exec();
        if (!user) {
            throw createHttpError(401, "Email don't exist. Please register a new account!");
        } else {

            // Limit the interval between password resets
            if (lastResetPassword) {
                const currentTime: number = new Date().getTime();
                const timeDifference = currentTime - lastResetPassword.createdAt.getTime();
                const timeRemain = env.MIN_TIME_TO_CREATE_KEY - timeDifference;

                if (timeRemain > 0) {
                    const timeRemain = env.MIN_TIME_TO_CREATE_KEY - timeDifference;
                    throw createHttpError(401, `Try again in ${Math.ceil(timeRemain / 1000)} second(s)!`);
                }
                else {
                    await ResetPasswordModel.deleteMany({ email });
                }
            }

            const resetPass = await ResetPasswordModel.create({ email });
            res.status(200).json(apiResponseService.success(
                null,
                200,
                "Recovery key has been sent to your email! Link reset: <host>/api/v1/auth/resetpass/" + resetPass._id
            ));
        }
    } catch (error) {
        next(error);
    }
}

/**
 * RESET PASSWORD
 */
const resetPassword: RequestHandler<unknown, unknown, IResetPasswordBody, unknown> = async (req, res, next) => {

    const keyResetPassword = req.body.key;
    const newPasswordRaw = req.body.newPassword;

    try {
        // Check parameter
        if (!keyResetPassword || !newPasswordRaw) {
            throw createHttpError(400, "Missing parameter(s)!");
        }
        if (!mongoose.isValidObjectId(keyResetPassword)) {
            throw createHttpError(400, "Invalid key format!");
        }

        // Check key reset
        const resetPasswordRequest = await ResetPasswordModel.findById(keyResetPassword).exec();
        if (!resetPasswordRequest) {
            throw createHttpError(400, "Invalid key!");
        }

        // Check the key's expiration date
        const currentTime: number = new Date().getTime();
        const timeDifference = currentTime - resetPasswordRequest.createdAt.getTime();
        const timeRemain = env.KEY_AVAILABILITY_TIME - timeDifference;
        if (timeRemain < 0) {
            throw createHttpError(400, `Key has expired!`);
        }

        // If everything is ok, update the password
        const email = resetPasswordRequest.email;
        const passwordHashed = await bcrypt.hash(newPasswordRaw, 10);
        const user = await UserModel.findOneAndUpdate(
            { email, deletedAt: null },
            { password: passwordHashed },
            { new: true }
        );

        // Delete the reset request & return result
        await ResetPasswordModel.findByIdAndDelete(keyResetPassword);

        res.status(200).json(apiResponseService.success(
            user,
            200,
            "New password updated successfully!!"
        ));
    } catch (error) {
        next(error);
    }
}



const AuthController = {
    getAuthenInfor,
    signUp,
    signIn,
    signOut,
    forgotPassword,
    resetPassword,
}

export default AuthController; 