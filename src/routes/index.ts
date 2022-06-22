import express, { Router } from "express";
import userRouter from "./user.routes";
import commandRouter from "./command.routes";
import trackRouter from "./track.routes";

const routes: Router = express();
routes.use("/users", userRouter);
routes.use("/commands", commandRouter);
routes.use("/tracks", trackRouter);

export default routes;
