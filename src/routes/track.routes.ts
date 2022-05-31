import express, { Router } from "express";
import auth from "../middlewares/auth";
import TrackController from "../resourses/track/track.controller";

const trackRouter: Router = express();
const trackController = new TrackController();

trackRouter.get("/", auth, trackController.list);
trackRouter.get("/:id", auth, trackController.getById);
trackRouter.post("/", auth, trackController.getByName);
trackRouter.post("/create", auth, trackController.create);
trackRouter.delete("/delete/:id", auth, trackController.deleteById);

export default trackRouter;
