import express, { Express, NextFunction, Request, Response } from "express";

export class Custom {
  public static error(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const name = err.name;
    const status = res.statusCode || 400;
    const stack = process.env.NODE_ENV === "DEVELOPMENT" ? err.stack : {};
    const message = err.message || "something went wrong";
    res.status(status).json({
      name,
      status,
      stack,
      message,
    });
  }
}
