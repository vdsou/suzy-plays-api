import express, { Router } from "express";
import UserController from "../resourses/user/user.controller";
import auth from "../middlewares/auth";
import { validateSignIn, validateSignUp, validateUserUpdate } from "../middlewares/validate";

const userRouter: Router = express();
const userController = new UserController();

userRouter.get("/me", auth, userController.me);
userRouter.post("/signup", validateSignUp, userController.signUp);
userRouter.post("/signin", validateSignIn, userController.signIn);
userRouter.delete("/delete/:id", auth, userController.delete);
userRouter.patch("/update", auth, validateUserUpdate, userController.update);

export default userRouter;
