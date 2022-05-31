import express, { Router } from "express";
import userRouter from "./user.routes";
import commandRouter from "./command.routes";
import trackRouter from "./track.routes";

const routes: Router = express();
routes.use("/user", userRouter);
routes.use("/command", commandRouter);
routes.use("/track", trackRouter);

export default routes;
