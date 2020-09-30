import ChatModel from "../../models/chat";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import MessageModel from "../../models/message";

export class ChatService {
  async showChats(userId, search) {
    try {
      const chats = await ChatModel.find({ users: userId }).populate("userss");
      return chats;
    } catch (error) {
      throw error;
    }
  }
  async showChat(id, userId, isChat) {
    try {
      if (isChat) {
        const chatId = id;
        const chat = await ChatModel.findOne({ _id: chatId }).populate({
          path: "messages",
        });
        return chat;
      } else {
        const receiverId = id;
        const chat = ChatModel.findOne({
          users: { $all: [userId, receiverId] },
        }).populate("messages");
        return chat;
      }
    } catch (error) {
      throw error;
    }
  }
  async addChat(id, userId, isChat, messageData) {
    try {
      if (isChat) {
        const chatId = id;
        const message = await MessageModel.create({
          sender: userId,
          content: messageData,
        });
        const done = await ChatModel.findOneAndUpdate(
          { _id: chatId },
          {
            $push: { messages: message._id },
          }
        );
        return done;
      } else {
        const receiverId = id;
        const message = await MessageModel.create({
          sender: userId,
          content: messageData,
        });
        const chat = await ChatModel.findOne({
          users: { $all: [userId, receiverId] },
        });
        if (chat) {
          //   console.log(chat);
          chat.messages.push(message._id);
          const done = await chat.save();
          if (done) return true;
        } else {
          const done = await ChatModel.create({
            users: [userId, receiverId],
            messages: [message._id],
          });
          if (done) return true;
        }
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new ChatService();
