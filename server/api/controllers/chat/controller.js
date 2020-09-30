import ChatService from "../../services/chat.service";

export class Controller {
  async showChats(req, res) {
    try {
      const chats = await ChatService.showChats(req.user._id, req.query.search);
      res.send({
        status: "500",
        chats,
        message: "Chats fetched Successfully",
      });
    } catch (error) {
      res.send({
        status: error.status || 404,
        message: error.message || "Some error Occured",
      });
    }
  }
  async showChat(req, res) {
    try {
      const chat = await ChatService.showChat(
        req.params.id,
        req.user._id,
        req.query.chat
      );
      res.send({
        status: "500",
        chat,
        message: "Chat fetched Successfully",
      });
    } catch (error) {
      res.send({
        status: error.status || 404,
        message: error.message || "Some error Occured",
      });
    }
  }
  async addChat(req, res) {
    try {
      const done = await ChatService.addChat(
        req.params.id,
        req.user._id,
        req.query.chat,
        req.body
      );
      if (done)
        res.send({
          status: "500",
          message: "Chat added Successfully",
        });
      else throw { message: "Some error occured" };
    } catch (error) {
      res.send({
        status: error.status || 404,
        message: error.message || "Some error Occured",
      });
    }
  }
}

export default new Controller();
