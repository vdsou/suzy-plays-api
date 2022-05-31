import { Command } from "../../entity/Command";
import { ICreateCommand } from "./dtos/command.create.dtos";
import { IUpdateCommand } from "./dtos/command.update.dtos";
import { AppDataSource } from "../../config/data-source";
import AppError from "../../shared/error/AppError";

export default class CommandService {
  async create(commandData: ICreateCommand) {
    const { command_name } = commandData;
    const commandRepository = AppDataSource.getRepository(Command);
    const commandExists = await commandRepository.findOne({ where: { command_name } });
    if (commandExists) {
      throw new AppError("Command already exists!", 409);
    }
    const newCommand = commandData;
    const command = commandRepository.save(newCommand);

    return command;
  }
  async list() {
    const commandRepository = AppDataSource.getRepository(Command);
    const commands = await commandRepository.find({});
    return commands;
  }

  async getByName(command_name: string) {
    const commandRepository = AppDataSource.getRepository(Command);
    const commandExists = await commandRepository.findOne({ where: { command_name } });
    if (!commandExists) {
      throw new AppError("Command does not exist", 404);
    }
    return commandExists;
  }
  async getById(command_id: string) {
    const commandRepository = AppDataSource.getRepository(Command);
    try {
      const commandExists = await commandRepository.findOne({ where: { id: command_id } });
      if (!commandExists) {
        throw new AppError("Command does not exist", 404);
      }
      return commandExists;
    } catch (error) {
      throw new AppError("Command does not exist", 404);
    }
  }
  async deleteById(command_id: string) {
    const commandRepository = AppDataSource.getRepository(Command);
    try {
      const commandExists = await commandRepository.findOne({ where: { id: command_id } });
      if (!commandExists) {
        throw new AppError("Command does not exist", 404);
      }
      await commandRepository.delete(command_id);
      return commandExists;
    } catch (error) {
      throw new AppError("Command does not exist", 404);
    }
  }
  async updateById(command_id: string, commandToUpdate: IUpdateCommand) {
    const commandRepository = AppDataSource.getRepository(Command);
    try {
      const commandExists = await commandRepository.findOne({ where: { id: command_id } });
      if (!commandExists) {
        throw new AppError("Command does not exist", 404);
      }

      const command = commandRepository.save({
        ...commandExists,
        ...commandToUpdate,
        updated_at: new Date(),
      });
      return command;
    } catch (error) {
      throw new AppError("Command does not exist", 404);
    }
  }
}
