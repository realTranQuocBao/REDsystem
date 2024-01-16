import express, { Application } from "express";
import CourseRoute from "./course.route"
import importData from "../utils/importData.util";
import AuthRoute from "./auth.route";
import UserRoute from "./user.route";
import { auth } from "../middlewares/auth.middleware";


const routes = (app: Application) => {
    app.use("/api/v1/import", importData);

    app.use("/api/v1/auth", AuthRoute);
    app.use("/api/v1/course", auth, CourseRoute);
    app.use("/api/v1/user", auth, UserRoute);


    app.use('/favicon.ico', express.static('public/images/favicon.ico'));
    app.get("/", (req, res) => {
        res.send(`Welcome to REDsystem API <3 (16-Jan-2024)`);
    });
    app.post("/", auth, (req, res) => {
        console.log(res.locals);

        res.send(`Welcome to REDsystem API <3 (16-Jan-2024)`);
    });
}

export default routes;
