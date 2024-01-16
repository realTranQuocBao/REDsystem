import { RequestHandler } from "express";
import CourseModel from "../models/course.model";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { ICreateCourseBody, IUpdateCourseBody, IUpdateCourseParam } from "../interfaces/ICourse.interface";
import apiResponseService from "../services/apiResponse.service";

/**
 * [C]reate
 */
const create: RequestHandler<unknown, unknown, ICreateCourseBody, unknown> = async (req, res, next) => {
    // Get the authenticated user id
    const userId = res.locals?.jwtPayload?._id;

    const name = req.body.name;
    const category = req.body.category;
    const price = req.body.price;
    const level = req.body.level;
    const duration = req.body.duration;
    const language = req.body.language;
    const instructor = req.body.instructor;

    try {
        if (!name) {
            throw createHttpError(400, "Course must have a name!");
        }

        const newCourse = await CourseModel.create({
            name: name,
            category: category,
            price: price,
            level: level,
            duration: duration,
            language: language,
            instructor: instructor,
            createdBy: userId,
            updatedBy: userId
        });
        await newCourse.populate('createdBy', '_id name email')
        await newCourse.populate('updatedBy', '_id name email');

        res.status(201).json(apiResponseService.success(
            newCourse,
            201,
            "Course created successfully!"
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
        const courses = await CourseModel.find({
            deletedAt: deleted ? { $ne: null } : null
        })
            .populate("createdBy", "_id name email")
            .populate("updatedBy", "_id name email")
            .exec();

        res.status(200).json(apiResponseService.success(
            courses,
            200,
            "Get course list successfully!"
        ));
    } catch (error) {
        next(error);
    }
}
// Read (single item)
const getById: RequestHandler = async (req, res, next) => {
    const courseId = req.params.id;
    const deleted = (req?.query?.deleted === "true") ? true : false;

    try {
        if (!mongoose.isValidObjectId(courseId)) {
            throw createHttpError(400, "Invalid Course's ID!");
        }

        const course = await CourseModel.findOne({
            _id: courseId,
            deletedAt: deleted ? { $ne: null } : null
        })
            .populate("createdBy", "_id name email")
            .populate("updatedBy", "_id name email")
            .exec();

        if (!course) {
            throw createHttpError(404, "Course not found!");
        }

        res.status(200).json(apiResponseService.success(
            course,
            200,
            "Get course data successfully!"
        ));
    } catch (error) {
        next(error);
    }
}

/**
 * [U]pdate
 */
const update: RequestHandler<IUpdateCourseParam, unknown, IUpdateCourseBody, unknown> = async (req, res, next) => {
    // Get the authenticated user id
    const userId = res.locals?.jwtPayload?._id;

    const courseId = req.params.id;

    try {
        if (!mongoose.isValidObjectId(courseId)) {
            throw createHttpError(400, "Invalid Course's ID!");
        }

        const updatedCourse = await CourseModel.findOneAndUpdate(
            { _id: courseId, deletedAt: null },
            { $set: req.body, updatedBy: userId },
            { new: true }
        ).populate('createdBy', '_id name email').populate('updatedBy', '_id name email');

        if (!updatedCourse) {
            throw createHttpError(404, "Course not found!");
        }

        res.status(200).json(apiResponseService.success(
            updatedCourse,
            200,
            "Course updated successfully!"
        ));
    } catch (error) {
        next(error);
    }
}
const restore: RequestHandler = async (req, res, next) => {
    // Get the authenticated user id
    const userId = res.locals?.jwtPayload?._id;

    const courseId = req.params.id;

    try {
        if (!mongoose.isValidObjectId(courseId)) {
            throw createHttpError(400, "Invalid Course's ID!");
        }

        // Soft delete: Update 'deletedAt' to the current timestamp
        const restoredCourse = await CourseModel.findOneAndUpdate(
            { _id: courseId, deletedAt: { $ne: null } },
            { deletedAt: null, updatedBy: userId },
            { new: true }
        ).populate('createdBy', '_id name email').populate('updatedBy', '_id name email');

        if (!restoredCourse) {
            throw createHttpError(404, "Course not found OR Course not in trash!");
        }

        res.status(200).json(apiResponseService.success(
            restoredCourse,
            200,
            "Course restored successfully!"
        ));

    } catch (error) {
        next(error);
    }
}

/**
 * [D]elete
 */
const softDelete: RequestHandler = async (req, res, next) => {
    // Get the authenticated user id
    const userId = res.locals?.jwtPayload?._id;

    const courseId = req.params.id;

    try {
        if (!mongoose.isValidObjectId(courseId)) {
            throw createHttpError(400, "Invalid Course's ID!");
        }

        const course = await CourseModel.findById(courseId).exec();

        if (!course) {
            throw createHttpError(404, "Course not found!");
        }

        if (course.deletedAt === null) {
            // Soft delete: Update 'deletedAt' to the current timestamp
            await CourseModel.findByIdAndUpdate(courseId,
                { deletedAt: new Date(), updatedBy: userId },
                { new: true }
            );

            res.status(200).json(apiResponseService.success(
                null,
                200,
                "The course has been successfully deleted!"
            ));

        } else {
            // Real delete: Remove the document from the database
            await CourseModel.findByIdAndDelete(courseId);

            res.status(200).json(apiResponseService.success(
                null,
                200,
                "The course has been permanently deleted!"
            ));
        }
    } catch (error) {
        next(error);
    }
}


const CourseController = {
    create,
    getAll,
    getById,
    update,
    restore,
    softDelete
}

export default CourseController; 