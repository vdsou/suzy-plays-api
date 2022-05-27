import dotenv from "dotenv";
dotenv.config();
const secret = process.env.secretJWT;
const expiresIn = process.env.expiresIn
export default {
  secret,
  expiresIn,
};
