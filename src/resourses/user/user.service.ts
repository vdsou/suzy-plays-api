import { UserUpdate } from "./dtos/user.update.dtos";
import md5 from "crypto-js/md5";
import { sign } from "jsonwebtoken";
import { User } from "../../entity/User";
import { AppDataSource } from "../../config/data-source";
import { UserSignUp } from "./dtos/user.signup.dtos";
import { UserSignIn } from "./dtos/user.signin.dtos";
import AppError from "../../shared/error/AppError";
import authConfig from "../../config/auth";

export default class UserService {
  async me(userId: string) {
    const userRepository = AppDataSource.getRepository(User);
    const userExists = await userRepository.findOne({ where: { id: userId } });
    if (!userExists) {
      throw new AppError("Something went wrong", 500);
    }
    return userExists;
  }
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
    const { secret, expiresIn } = authConfig;
    const token = sign(
      {
        id: userExists.id,
        name: userExists.name,
        username: userExists.username,
      },
      secret,
      { expiresIn },
    );
    return token;
  }
  async deleteById(id: string) {
    const userRepository = AppDataSource.getRepository(User);
    const userExists = await userRepository.findOne({ where: { id } });
    if (userExists) {
      try {
        const res = await userRepository.delete(id);
        return res;
      } catch (error) {
        throw new AppError("Something went wrong", 500);
      }
    }
  }
  async updateById(UserDataTobeUpdated: UserUpdate, id: string) {
    const userRepository = AppDataSource.getRepository(User);
    const { username, password } = UserDataTobeUpdated;
    const passwordHash = md5(password).toString();
    const userExists = await userRepository.findOne({ where: { id } });
    if (userExists) {
      try {
        userRepository.save({
          ...userExists,
          username: username ? username : userExists.username,
          password: password ? passwordHash : userExists.password,
          updated_at: new Date(),
        });
      } catch (error) {
        throw new AppError("Something went wrong", 500);
      }
    } else {
      throw new AppError("Something went wrong", 500);
    }
  }
}
