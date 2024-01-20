import express from "express";
import CourseModel from "../models/course.model";
import courses from "../datas/course.data";
import apiResponseService from "../services/apiResponse.service";
import users from "../datas/user.data";
import UserModel from "../models/user.model";




const importData = express.Router();

importData.post(
    "/user",
    async (req, res) => {
        await UserModel.deleteMany({});
        const importedCourses = await UserModel.insertMany(users);
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

