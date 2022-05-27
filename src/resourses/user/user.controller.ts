import { Response, Request } from "express";
import UserService from "./user.service";

export default class UserController {
  async signUp(req: Request, res: Response) {
    const userPayload = req.body;
    const userService = new UserService();
    const user = await userService.signUp(userPayload);
    return res.status(201).json({ message: "user created sucessfully!", user });
  }
}
