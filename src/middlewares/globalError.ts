import { Request, Response, NextFunction } from "express";
import AppError from "../shared/error/AppError";

export const globalError = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    console.log(error);
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
      data: error?.data,
    });
  }
  console.log(error);
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
