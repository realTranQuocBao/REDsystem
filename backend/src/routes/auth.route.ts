import express from "express";
import AuthController from "../controllers/auth.controller";

const AuthRoute = express.Router();

AuthRoute.post("/signup", AuthController.signUp);
AuthRoute.post("/signin", AuthController.signIn);
AuthRoute.post("/signout", AuthController.signOut);
AuthRoute.post("/forgotpass", AuthController.forgotPassword);
AuthRoute.post("/resetpass/:key", AuthController.resetPassword);

export default AuthRoute;