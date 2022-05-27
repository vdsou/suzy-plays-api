import "express-async-errors";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import routes from "./routes";
import "./config/database";
import { globalError } from "./middlewares/globalError";
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", routes);
app.use(globalError);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, world!" });
});

app.listen(PORT, () => console.log(`⚡️[SERVER]: Server is up at port: ${PORT}`));
