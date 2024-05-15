import express, { Express, Request, Response } from "express";
import { Validator } from "../validators/admin.validator";
import { Admin } from "../controllers/admin.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const adminRoute = express.Router();

adminRoute
  .get(
    "/users",
    AuthMiddleware.middleware,
    AuthMiddleware.getAdmin,
    Admin.getAllUsers
  )
  .get("/user", AuthMiddleware.middleware, Admin.getLoggedInUser)
  .post("/signup", Validator.validateSignup, Admin.signup)
  .post("/signin", Validator.validateLogin, Admin.signin);

export default adminRoute;
