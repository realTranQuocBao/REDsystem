import express, { Application } from "express";
import CourseRoute from "./course.route"



const routes = (app: Application) => {
    app.use("/api/v1/course", CourseRoute);


    app.use('/favicon.ico', express.static('public/images/favicon.ico'));
    app.get("/", (req, res) => {
        res.send(`Welcome to REDsystem API <3 (16-Jan-2024)`);
    });
}

export default routes;
