import { Response, Request } from "express";
import UserService from "./user.service";

export default class UserController {
  async signUp(req: Request, res: Response) {
    const userPayload = req.body;
    const userService = new UserService();
    const user = await userService.signUp(userPayload);
    return res.status(201).json({ message: "user created sucessfully!", user });
  }
  async signIn(req: Request, res: Response) {
    const { username, password } = req.body;
    const userService = new UserService();
    const user = await userService.signIn({ username, password });
    return res.status(200).json({ message: "user is signed in", user });
  }
}
