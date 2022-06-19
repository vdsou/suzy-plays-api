import express, { Router } from "express";
import UserController from "../resourses/user/user.controller";
import auth from "../middlewares/auth";

const userRouter: Router = express();
const userController = new UserController();

userRouter.post("/signup", userController.signUp);
userRouter.post("/signin", userController.signIn);
userRouter.delete("/delete/:id", auth, userController.delete);

export default userRouter;
