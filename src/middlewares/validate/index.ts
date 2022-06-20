import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

// validate request
const next = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json({ errors: errors.array().map((item) => item.msg) });
  }
  next();
};

export const validateSignUp = [
  body("email").isEmail().withMessage("Must be a valid email format"),
  body("password").isLength({ min: 6 }).withMessage("Password should be at least 6 characters."),
  body("name").isString().trim(),
  body("username").trim(),

  next,
];
export const validateSignIn = [
  body("username").isString().trim(),

  next,
];
