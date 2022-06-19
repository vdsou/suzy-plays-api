import express, { Router } from "express";
import TrackController from "../resourses/track/track.controller";
import auth from "../middlewares/auth";

const trackRouter: Router = express();
const trackController = new TrackController();

trackRouter.get("/", trackController.list);
trackRouter.get("/:id", trackController.getById);
trackRouter.post("/", trackController.getByName);
trackRouter.post("/create", auth, trackController.create);
trackRouter.delete("/delete/:id", auth, trackController.deleteById);

export default trackRouter;
