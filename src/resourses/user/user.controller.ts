import { Response, Request } from "express";
import UserService from "./user.service";

export default class UserController {
  async me(req: Request, res: Response) {
    const userService = new UserService();
    const userId = req.user.id;
    const user = await userService.me(userId);
    return res.status(200).json(user);
  }
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
  async update(req: Request, res: Response) {
    const { id } = req.user;
    const { username, password } = req.body;
    const userService = new UserService();
    const result = await userService.updateById({ username, password }, id);
    return res.status(200).json({ message: "User is updated successfully", result });
  }
}
