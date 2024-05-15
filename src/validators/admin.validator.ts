import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { Auth } from "./../models/admin/admin.model";

export class Validator {
  public static async validateSignup(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { name, email, imageURL, password, repeatPassword } = req.body;

    if (!name || !email || !imageURL || !password || !repeatPassword) {
      return res.status(400).json({
        Msg: "All felds are required",
      });
    }

    if (password !== repeatPassword) {
      return res.status(400).json({
        Msg: "The passwords don't match",
      });
    }
    if (!email.includes("@") || !email.includes(".com")) {
      return res.status(400).json({
        Msg: "Please enter a valid email",
      });
    }
    const user = await Auth.findOne({ email });
    if (user) {
      return res.json({ msg: "User already exists, please signin" });
    }
    next();
  }

  public static async validateLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        Msg: "All felds are required",
      });
    }

    const user = await Auth.findOne({ email });
    if (!user) {
      return res.json({
        msg: "User does not exists, please Signup or try again",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.json({ msg: "Incorrect credentials" });
    }
    next();
  }
}
