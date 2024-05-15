import app from "./app";
import { Config } from "./config/config";
import { Connect } from "./utils/db";

const server = () => {
  app.listen(Config.PORT);
  Connect.db();
  console.log(`Server started on port ${Config.PORT}`);
};

server();
