import mongoose from "mongoose";
import { IAuth } from "../../interface/app.interface";

const auth = new mongoose.Schema<IAuth>(
  {
    name: {
      type: String,
      required: [true, "The name field is required"],
    },
    email: {
      type: String,
      required: [true, "The email field is required"],
    },
    imageURL: {
      type: String,
      required: [true, "The imageURL field is required"],
    },
    password: {
      type: String,
      required: [true, "The password field is required"],
    },
    repeatPassword: {
      type: String,
    },
    roles: {
      type: String,
      enums: {
        values: ["Admin", "Staff"],
        message: "{VALUE} is not supported",
      },
      default: "Staff",
    },
  },
  { timestamps: true }
);

export const Auth = mongoose.model("auth", auth);
