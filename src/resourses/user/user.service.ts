import { User } from "../../entity/User";
import { AppDataSource } from "../../config/data-source";
import { UserSignUp } from "./dtos/user.signup.dtos";
import { UserSignIn } from "./dtos/user.signin.dtos";
import AppError from "../../shared/error/AppError";

export default class UserService {
  async signUp(userData: UserSignUp) {
    const { username } = userData;
    const userRespository = AppDataSource.getRepository(User);
    const userExists = await userRespository.findOne({ where: { username } });

    if (userExists) {
      throw new AppError("User already exists!", 409);
    }
    const createdUser = userRespository.save(userData);
    return createdUser;
  }

  async signIn(userData: UserSignIn) {
    const { username, password } = userData;
    const userRespository = AppDataSource.getRepository(User);
    const userExists = await userRespository.findOne({ where: { username, password } });
    if (!userExists) {
      throw new AppError("Unauthorized", 401);
    }
    return userExists;
  }
}
