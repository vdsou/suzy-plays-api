import { Request, Response } from "express";
import TrackService from "./track.service";
export default class TrackController {
  async create(req: Request, res: Response) {
    const trackService = new TrackService();
    const track = req.body;
    const trackToAdd = {
      track_title: track.trackTitle,
      image_url: track.imageUrl,
      duration: track.duration,
      command_id: track.commandId,
    };
    const newTrack = await trackService.create(trackToAdd);
    return res.status(201).json({ message: "Track created successfully", track: newTrack });
  }
  async list(req: Request, res: Response) {
    const trackService = new TrackService();
    const tracks = await trackService.list();
    return res.status(200).json(tracks);
  }
  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const trackService = new TrackService();
    const track = await trackService.getById(id);
    return res.status(200).json(track);
  }
  async getByName(req: Request, res: Response) {
    const { trackTitle } = req.body;
    const trackService = new TrackService();
    const track = await trackService.getByName(trackTitle);
    return res.status(200).json(track);
  }
  async deleteById(req: Request, res: Response) {
    const { id } = req.params;
    const trackService = new TrackService();
    await trackService.deleteById(id);
    return res.status(200).json({ message: "Track deleted successfully" });
  }
}
