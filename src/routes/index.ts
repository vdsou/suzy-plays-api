import express, { Router } from "express";
import userRouter from "./user.routes";


const routes: Router = express();
routes.use("/user", userRouter);

export default routes;
