import { IConfig } from "../interface/app.interface";

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 2300;
export const Config: IConfig = {
  PORT: port,
  // AUTH_SECRET: process.env.AUTH_SECRET as string,
  DB_URI: process.env.DB_URI as string,
};
