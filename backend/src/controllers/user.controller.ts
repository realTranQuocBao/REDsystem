import { RequestHandler } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import apiResponseService from "../services/apiResponse.service";
import { ISignUpBody as ICreateUserBody, IUpdateUserBody, IUpdateUserParam } from "../interfaces/IUser.interface";
import UserModel from "../models/user.model";



/**
 * [C]reate
 */
const create: RequestHandler<unknown, unknown, ICreateUserBody, unknown> = async (req, res, next) => {
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
            "User created successfully!"
        ));
    } catch (error) {
        next(error);
    }
}

/**
 * [R]ead
 */
// Read (all items)
const getAll: RequestHandler = async (req, res, next) => {

    // If deleted===true (Read all items soft-deleted)
    const deleted = (req?.query?.deleted === "true") ? true : false;

    try {
        const users = await UserModel.find({
            deletedAt: deleted ? { $ne: null } : null
        }).exec();

        res.status(200).json(apiResponseService.success(
            users,
            200,
            "Get user list successfully!"
        ));
    } catch (error) {
        next(error);
    }
}
// Read (single item)
const getById: RequestHandler = async (req, res, next) => {
    const userId = req.params.id;
    const deleted = (req?.query?.deleted === "true") ? true : false;

    try {
        if (!mongoose.isValidObjectId(userId)) {
            throw createHttpError(400, "Invalid User's ID!");
        }

        const user = await UserModel.findOne({
            _id: userId,
            deletedAt: deleted ? { $ne: null } : null
        }).exec();

        if (!user) {
            throw createHttpError(404, "User not found!");
        }

        res.status(200).json(apiResponseService.success(
            user,
            200,
            "Get user data successfully!"
        ));
    } catch (error) {
        next(error);
    }
}

/**
 * [U]pdate
 */
const update: RequestHandler<IUpdateUserParam, unknown, IUpdateUserBody, unknown> = async (req, res, next) => {
    const userId = req.params.id;

    try {
        if (!mongoose.isValidObjectId(userId)) {
            throw createHttpError(400, "Invalid User's ID!");
        }

        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: userId, deletedAt: null },
            { $set: req.body },
            { new: true }
        );

        if (!updatedUser) {
            throw createHttpError(404, "User not found!");
        }

        res.status(200).json(apiResponseService.success(
            updatedUser,
            200,
            "User updated successfully!"
        ));
    } catch (error) {
        next(error);
    }
}
const restore: RequestHandler = async (req, res, next) => {
    const userId = req.params.id;

    try {
        if (!mongoose.isValidObjectId(userId)) {
            throw createHttpError(400, "Invalid User's ID!");
        }

        // Soft delete: Update 'deletedAt' to the current timestamp
        const restoredUser = await UserModel.findOneAndUpdate(
            { _id: userId, deletedAt: { $ne: null } },
            { deletedAt: null },
            { new: true }
        );

        if (!restoredUser) {
            throw createHttpError(404, "User not found OR User not in trash!");
        }

        res.status(200).json(apiResponseService.success(
            restoredUser,
            200,
            "User restored successfully!"
        ));

    } catch (error) {
        next(error);
    }
}

/**
 * [D]elete
 */
const softDelete: RequestHandler = async (req, res, next) => {
    const userId = req.params.id;

    try {
        if (!mongoose.isValidObjectId(userId)) {
            throw createHttpError(400, "Invalid User's ID!");
        }

        const user = await UserModel.findById(userId).exec();

        if (!user) {
            throw createHttpError(404, "User not found!");
        }

        if (user.deletedAt === null) {
            // Soft delete: Update 'deletedAt' to the current timestamp
            await UserModel.findByIdAndUpdate(userId,
                { deletedAt: new Date() },
                { new: true }
            );

            res.status(200).json(apiResponseService.success(
                null,
                200,
                "The user has been successfully deleted!"
            ));

        } else {
            // Real delete: Remove the document from the database
            await UserModel.findByIdAndDelete(userId);

            res.status(200).json(apiResponseService.success(
                null,
                200,
                "The user has been permanently deleted!"
            ));
        }
    } catch (error) {
        next(error);
    }
}


const UserController = {
    create,
    getAll,
    getById,
    update,
    restore,
    softDelete
}

export default UserController; 