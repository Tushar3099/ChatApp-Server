import * as express from "express";
import controller from "./controller";
import isAuthenticated from "../../middlewares/isAuthenticated";

export default express
  .Router()
  .get("/", isAuthenticated, controller.searchUser)
  .get("/friend", isAuthenticated, controller.searchFriends)
  .get("/:id", controller.getUser)
  .post("/:id", controller.addDetails)
  .delete("/:id")
  .put("/:id");
