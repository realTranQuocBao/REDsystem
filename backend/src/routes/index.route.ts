import express, { Application } from "express";
import CourseRoute from "./course.route"



const routes = (app: Application) => {
    app.use("/api/v1/course", CourseRoute);


    app.use('/favicon.ico', express.static('public/images/favicon.ico'));
    app.get("/", (req, res, next) => {
        try {
            throw Error("hihi");
        } catch (error) {
            next(error);
        }
        res.send("Hello Bao <3");
    });
}

export default routes;
