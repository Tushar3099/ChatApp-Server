import UserService from "../../services/user.service";

export class Controller {
  async searchUser(req, res) {
    try {
      const users = await UserService.searchUser(req.query.search);
      res.send({
        status: "500",
        users,
        message: "Search Successfull",
      });
    } catch (error) {
      res.send({
        status: error.status || 404,
        message: error.message || "Some error Occured",
      });
    }
  }
  async getUser(req, res) {
    try {
      const user = await UserService.getUser(req.params.id);
      res.send({
        status: "500",
        user,
        message: "User Details Fetched",
      });
    } catch (error) {
      res.send({
        status: error.status || 404,
        message: error.message || "Some error Occured",
      });
    }
  }
  async addDetails(req, res) {
    try {
      const done = await UserService.addDetails(req.params.id, req.query);
      if (done)
        res.send({
          status: "500",
          message: "Details added Successfully",
        });
    } catch (error) {
      res.send({
        status: error.status || 404,
        message: error.message || "Some error Occured",
      });
    }
  }
  async searchFriends(req, res) {
    try {
      const friends = await UserService.searchFriends(
        req.user._id,
        req.query.search
      );
      res.send({
        status: "500",
        friends,
        message: "Friends fetched Successfully",
      });
    } catch (error) {
      res.send({
        status: error.status || 404,
        message: error.message || "Some error Occured",
      });
    }
  }
}

export default new Controller();
