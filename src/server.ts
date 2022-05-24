import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  res.json({message: "Hello, world!"});
});

console.log(app.listen)
app.listen(PORT, () => console.log(`⚡️[SERVER]: Server is up at port: ${PORT}`));
export {
  app
}