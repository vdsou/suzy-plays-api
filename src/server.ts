import express, { Express, Request, Response } from "express";
import { createConnection } from "typeorm";
import morgan from "morgan";
import dotenv from "dotenv";
import routes from "./routes";
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

createConnection()
  .then((connection) => {
    app.use(morgan("dev"));
    app.use("/api", routes);

    app.get("/", (req: Request, res: Response) => {
      res.json({ message: "Hello, world!" });
    });

    app.listen(PORT, () => console.log(`⚡️[SERVER]: Server is up at port: ${PORT}`));
  })
  .catch((error) => console.log(error));
