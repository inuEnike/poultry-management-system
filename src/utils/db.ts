import mongoose from "mongoose";
import { Config } from "../config/config";

const DB = Config.DB_URI;

export class Connect {
  public static async db() {
    await mongoose.connect(DB);
    console.info("Db fired up");
  }
}
