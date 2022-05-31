import express, { Router } from "express";
import userRouter from "./user.routes";
import commandRouter from "./command.routes";


const routes: Router = express();
routes.use("/user", userRouter);
routes.use("/command", commandRouter)

export default routes;
