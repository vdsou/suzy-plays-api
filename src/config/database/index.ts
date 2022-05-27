import { AppDataSource } from "../data-source";
AppDataSource.initialize()
  .then(() => console.log("⚡️[DATABASE] Database is connected"))
  .catch((error) => console.log(error));
