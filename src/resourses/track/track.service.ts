import { Track } from "../../entity/Track";
import { Command } from "../../entity/Command";
import { ICreateTrack } from "./dtos/track.create.dtos";
import { AppDataSource } from "../../config/data-source";
import AppError from "../../shared/error/AppError";

export default class TrackService {
  async create(trackData: ICreateTrack, user_id: string) {
    const { track_title, command_id } = trackData;
    const commandRepository = AppDataSource.getRepository(Command);

    const user = await commandRepository.findOne({ where: { id: command_id } });

    if (user.user_id === user_id) {
      const trackRepository = AppDataSource.getRepository(Track);
      const trackExists = await trackRepository.findOne({
        relations: ["command"],
        where: {
          command_id,
          track_title,
        },
      });

      if (trackExists) {
        throw new AppError("Track aready added", 409);
      }

      const track = await trackRepository.save(trackData);
      return track;
    }
    throw new AppError("You are not allowed to be here", 403);
  }
  async list() {
    const trackRepository = AppDataSource.getRepository(Track);
    const tracksExist = await trackRepository.find({ relations: ["command"] });
    if (!tracksExist) {
      throw new AppError("No tracks found", 404);
    }
    return tracksExist;
  }
  async getById(id: string) {
    const trackRepository = AppDataSource.getRepository(Track);
    try {
      const trackExists = await trackRepository.findOne({ where: { id } });
      if (!trackExists) {
        throw new AppError("Track does not exist", 404);
      }
      return trackExists;
    } catch (error) {
      throw new AppError("Track does not exist", 404);
    }
  }
  async getByName(trackTitle: string) {
    const trackRepository = AppDataSource.getRepository(Track);
    try {
      const trackExists = await trackRepository.findOne({ where: { track_title: trackTitle } });
      if (!trackExists) {
        throw new AppError("Track does not exist", 404);
      }
      return trackExists;
    } catch (error) {
      throw new AppError("Track does not exist", 404);
    }
  }
  async deleteById(id: string, user_id: string) {
    const trackRepository = AppDataSource.getRepository(Track);
    try {
      const trackExists = await trackRepository.findOne({
        relations: ["command"],
        where: { id },
      });
      if (trackExists && trackExists.command.user_id === user_id) {
        await trackRepository.delete(id);
      }
      else {
        throw new AppError("Track does not exist", 404);
      }
    } catch (error) {
      throw new AppError("Track does not exist", 404);
    }
  }
}
