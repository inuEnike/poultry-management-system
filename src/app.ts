import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { Custom } from "./middlewares/error.middleware";
import adminRoute from "./routes/admin.route";
dotenv.config();

const app: Express = express();
app.use(express.json());

app.use("/auth", adminRoute);

app.use(Custom.error);

export default app;
