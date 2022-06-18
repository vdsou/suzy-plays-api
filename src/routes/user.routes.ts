import express, { Router } from "express";
import UserController from "../resourses/user/user.controller";

const userRouter: Router = express();
const userController = new UserController();

userRouter.post("/signup", userController.signUp);
userRouter.post("/signin", userController.signIn);
userRouter.delete("/delete/:id", userController.delete);

export default userRouter;
