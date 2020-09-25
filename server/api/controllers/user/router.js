import * as express from "express";
import controller from "./controller";
import isAuthenticated from "../../middlewares/isAuthenticated";

export default express
  .Router()
  .get("/", controller.searchUser)
  .get("/:id", controller.getUser)
  .post("/:id", controller.addDetails)
  .delete("/:id")
  .put("/:id")
  .get("/friends", isAuthenticated, controller.searchFriends);
