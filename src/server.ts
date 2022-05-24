import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.listen(PORT, () => console.log(`⚡️[SERVER]: Server is up at port: ${PORT}`));
