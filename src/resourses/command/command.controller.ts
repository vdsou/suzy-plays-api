import { Request, Response } from "express";
import CommandService from "./command.service";

export default class CommandController {
  async create(req: Request, res: Response) {
    const commandData = req.body;
    const { id } = req.user;
    const commandService = new CommandService();
    const command = await commandService.create({
      user_id: id,
      playlist_title: commandData.playlistTitle,
      command_name: commandData.commandName,
    });
    return res.status(201).json({ message: "Command created sucessfully", command });
  }

  async list(req: Request, res: Response) {
    const commandService = new CommandService();
    const commands = await commandService.list();
    return res.status(200).json(commands);
  }

  async getByName(req: Request, res: Response) {
    const { commandName } = req.body;
    const commandService = new CommandService();
    const command = await commandService.getByName(commandName);
    return res.status(200).json(command);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const commandService = new CommandService();
    const command = await commandService.getById(id);
    return res.status(200).json(command);
  }

  async deleteById(req: Request, res: Response) {
    const { id } = req.params;
    const commandService = new CommandService();
    await commandService.deleteById(id);
    return res.status(200).json({ message: "Command deleted sucessfully" });
  }

  async updateById(req: Request, res: Response) {
    const { id } = req.params;
    const { commandName: command_name, playlistTitle: playlist_title } = req.body;
    const commandToUpdate = { command_name, playlist_title };
    const commandService = new CommandService();
    const command = await commandService.updateById(id, commandToUpdate);
    return res.status(200).json({ message: "Command updated sucessfully", command });
  }
}
