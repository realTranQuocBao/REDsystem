import express from "express";
import UserController from "../controllers/user.controller";
// import { admin } from "../middlewares/auth.middleware";


const UserRoute = express.Router();

UserRoute.post("/", UserController.create);

//Add `?deleted=true` to get item(s) that deleted
UserRoute.get("/", UserController.getAll);
UserRoute.get("/:id", UserController.getById);

UserRoute.patch("/:id", UserController.update);
UserRoute.patch("/:id/restore", UserController.restore);

UserRoute.delete("/:id", UserController.softDelete);


export default UserRoute;