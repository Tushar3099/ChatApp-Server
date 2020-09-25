import * as express from "express";
import controller from "./controller";
import isAuthenticated from "../../middlewares/isAuthenticated";

export default express
  .Router()
  .post("/login", controller.login)
  .post("/signin", controller.signin)
  .get("/otp", controller.generateOtp)
  .post("/otp", controller.verifyOtp);
