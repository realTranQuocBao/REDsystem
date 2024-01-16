import express from "express";
import CourseController from "../controllers/course.controller";

const CourseRoute = express.Router();

CourseRoute.post("/", CourseController.create);

//Add `?deleted=true` to get item(s) that deleted
CourseRoute.get("/", CourseController.getAll);
CourseRoute.get("/:id", CourseController.getById);

CourseRoute.patch("/:id", CourseController.update);
CourseRoute.patch("/:id/restore", CourseController.restore);

CourseRoute.delete("/:id", CourseController.softDelete);



export default CourseRoute;