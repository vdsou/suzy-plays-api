import express, { Router } from "express";
import CommandController from "../resourses/command/command.controller";
import auth from "../middlewares/auth";

const commandRouter: Router = express();
const commandController = new CommandController();

commandRouter.get("/", commandController.list);
commandRouter.get("/user", auth, commandController.getByUserId);
commandRouter.get("/:id", commandController.getById);
commandRouter.post("/", commandController.getByName);
commandRouter.post("/create", auth, commandController.create);
commandRouter.delete("/delete/:id", auth, commandController.deleteById);
commandRouter.patch("/update/:id", auth, commandController.updateById);

export default commandRouter;
