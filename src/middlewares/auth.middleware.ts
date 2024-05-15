import { NextFunction, Request, Response } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
export class AuthMiddleware {
  static middleware(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader || authHeader?.startsWith("Bearer")) {
        const token = authHeader.split(" ")[1];
        if (!token) {
          return res.json({ msg: "Unauthorized || No or invalid token" });
        }
        const payload = jwt.verify(token, "ennygenius2005") as JwtPayload;
        const user = payload.user;
        req.user = user;
        console.log(req.user.roles);
      } else {
        return res.json({ msg: "Unauthorized please insert token" });
      }
      next();
    } catch (error) {
      next(error);
    }
  }
  public static getAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user || req.user?.roles !== "Admin") {
        return res.status(403).json({ msg: "Not authorized" });
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}
