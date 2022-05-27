import express, { Router } from "express";
import UserController from "../resourses/user/user.controller";

const userRouter: Router = express();
const userController = new UserController();

userRouter.post("/signup", userController.signUp);

export default userRouter;
