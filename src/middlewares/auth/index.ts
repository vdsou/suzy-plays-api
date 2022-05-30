import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../../shared/error/AppError";
import jwt from "../../config/auth";
import { ITokenPayload } from "./ITokenPayload";

const userAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError("Token not sent", 401);
  }
  const [, token] = authHeader.split(" ");
  console.log(token);

  try {
    const decoded = verify(token, jwt.secret);
    console.log(decoded);
    const { id, name, username } = decoded as ITokenPayload;
    req.user = {
      id,
      name,
      username,
    };
    next();
  } catch (error) {
    throw new AppError("Invalid token");
  }
};

export default userAuth;
