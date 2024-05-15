import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Auth } from "./../models/admin/admin.model";
import { Config } from "../config/config";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export class Admin {
  public static async signup(req: Request, res: Response, next: NextFunction) {
    const { name, email, imageURL, password, roles } = req.body;
    try {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await Auth.create({
        name,
        email,
        imageURL,
        password: hashPassword,
        roles,
      });
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }
  public static async signin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const user = await Auth.findOne({ email });
      let payload = { user };

      const token = jwt.sign(payload, "ennygenius2005", {
        expiresIn: "30d",
      });
      res.json({ token });
    } catch (error) {
      next(error);
    }
  }
  public static async getLoggedInUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = req.user;
      res.json({ user });
      console.log(req.user);
    } catch (error) {
      next(error);
    }
  }
  public static async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const users = await Auth.find({});
      if (users.length < 0) {
        return res.json({ msg: "N user Available" });
      }
      res.json({ users });
    } catch (error) {
      next(error);
    }
  }
}
