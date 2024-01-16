import express from "express";
import CourseModel from "../models/course.model";
import courses from "../data/course.data";
import apiResponseService from "../services/apiResponse.service";
import users from "../data/user.data";




const importData = express.Router();

importData.post(
    "/user",
    async (req, res) => {
        await CourseModel.deleteMany({});
        const importedCourses = await CourseModel.insertMany(users);
        res.status(200).json(apiResponseService.success(
            importedCourses,
            200,
            "Import course data successfully!"
        ));
    }
);

importData.post(
    "/course",
    async (req, res) => {
        await CourseModel.deleteMany({});
        const importedCourses = await CourseModel.insertMany(courses);
        res.status(200).json(apiResponseService.success(
            importedCourses,
            200,
            "Import course data successfully!"
        ));
    }
);

export default importData;

