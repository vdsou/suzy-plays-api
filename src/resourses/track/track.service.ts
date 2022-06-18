import { Track } from "../../entity/Track";
import { ICreateTrack } from "./dtos/track.create.dtos";
import { AppDataSource } from "../../config/data-source";
import AppError from "../../shared/error/AppError";
export default class TrackService {
  async create(trackData: ICreateTrack) {
    const { track_title } = trackData;
    const trackRepository = AppDataSource.getRepository(Track);
    const trackExists = await trackRepository.findOne({ where: { track_title } });
    if (trackExists) {
      throw new AppError("Track aready added", 409);
    }
    const track = trackRepository.save(trackData);
    return track;
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
  async deleteById(id: string) {
    const trackRepository = AppDataSource.getRepository(Track);
    try {
      const trackExists = await trackRepository.findOne({ where: { id } });
      if (!trackExists) {
        throw new AppError("Track does not exist", 404);
      }
      await trackRepository.delete(id);
    } catch (error) {
      throw new AppError("Track does not exist", 404);
    }
  }
}
