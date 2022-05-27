import md5 from "crypto-js/md5";
import { User } from "../../entity/User";
import { AppDataSource } from "../../config/data-source";
import { UserSignUp } from "./dtos/user.signup.dtos";
import { UserSignIn } from "./dtos/user.signin.dtos";
import AppError from "../../shared/error/AppError";

export default class UserService {
  async signUp(userData: UserSignUp) {
    const { username, password } = userData;
    const userRepository = AppDataSource.getRepository(User);
    const userExists = await userRepository.findOne({ where: { username } });

    if (userExists) {
      throw new AppError("User already exists!", 409);
    }
    const passwordHash = md5(password).toString();
    const newUser = {
      ...userData,
      password: passwordHash,
    };
    const createdUser = userRepository.save(newUser);
    return createdUser;
  }

  async signIn(userData: UserSignIn) {
    const { username, password } = userData;
    const userRepository = AppDataSource.getRepository(User);
    const passwordHash = md5(password).toString();
    const userExists = await userRepository.findOne({ where: { username, password: passwordHash } });
    if (!userExists) {
      throw new AppError("Unauthorized", 401);
    }
    return userExists;
  }
}
