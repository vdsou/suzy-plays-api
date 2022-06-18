import { Response, Request } from "express";
import UserService from "./user.service";

export default class UserController {
  async signUp(req: Request, res: Response) {
    const userPayload = req.body;
    const userService = new UserService();
    const user = await userService.signUp(userPayload);
    return res.status(201).json({ message: "user created successfully!", user });
  }
  async signIn(req: Request, res: Response) {
    const { username, password } = req.body;
    const userService = new UserService();
    const token = await userService.signIn({ username, password });
    return res.status(200).json({ message: "user is signed", token });
  }
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const userService = new UserService();
    const result = await userService.deleteById(id);
    return res.status(200).json({ message: "User is deleted successfully", result });
  }
}
