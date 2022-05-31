import express, { Router } from "express";
import CommandController from "../resourses/command/command.controller";
import auth from "../middlewares/auth";

const commandRouter: Router = express();
const commandController = new CommandController();

commandRouter.get("/", auth, commandController.list);
commandRouter.get("/:id", auth, commandController.getById);
commandRouter.post("/", auth, commandController.getByName);
commandRouter.post("/create", auth, commandController.create);
commandRouter.delete("/delete/:id", auth, commandController.deleteById);
commandRouter.patch("/update/:id", auth, commandController.updateById);

export default commandRouter;
