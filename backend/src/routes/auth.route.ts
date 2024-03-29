import express from "express";
import AuthController from "../controllers/auth.controller";
import { auth } from "../middlewares/auth.middleware";

const AuthRoute = express.Router();

AuthRoute.post("/info", auth, AuthController.getAuthenInfor);
AuthRoute.post("/signup", AuthController.signUp);
AuthRoute.post("/signin", AuthController.signIn);
AuthRoute.post("/signout", AuthController.signOut);
AuthRoute.post("/forgotpass", AuthController.forgotPassword);
AuthRoute.post("/resetpass", AuthController.resetPassword);

export default AuthRoute;