import express, { Application } from "express";
import CourseRoute from "./course.route"
import importData from "../util/importData.util";
import AuthRoute from "./auth.route";
import UserRoute from "./user.route";



const routes = (app: Application) => {
    app.use("/api/v1/import", importData);

    app.use("/api/v1/auth", AuthRoute);
    app.use("/api/v1/course", CourseRoute);
    app.use("/api/v1/user", UserRoute);


    app.use('/favicon.ico', express.static('public/images/favicon.ico'));
    app.get("/", (req, res) => {
        res.send(`Welcome to REDsystem API <3 (16-Jan-2024)`);
    });
}

export default routes;
