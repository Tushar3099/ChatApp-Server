import UserModel from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService {
  async searchUser(search) {
    try {
      if (!search) throw { message: "Search field Empty" };
      const users = await UserModel.find({
        username: { $regex: `${search}`, $options: "i" },
      }).select("-password -__v");
      return users;
    } catch (error) {
      throw error;
    }
  }
  async getUser(userId) {
    try {
      const user = await UserModel.findOne({ _id: userId })
        .select("-password -__v")
        .populate({
          path: "friends",
          select: "name username phoneNumber -_id",
        });
      return user;
    } catch (error) {
      throw error;
    }
  }
  async searchFriends(userId, search) {
    try {
      if (!search) throw { message: "Search field Empty" };
      const friends = UserModel.findOne({ _id: userId })
        .populate({
          path: "friends",
          match: { username: { $regex: `${search}`, $options: "i" } },
          select: "name username phoneNumber",
        })
        .select("friends");
      return friends;
    } catch (error) {
      throw error;
    }
  }
  async addDetails(userId, body) {
    try {
      const {
        username,
        name,
        email,
        image,
        bio,
        phoneNumber,
        password,
        friend,
      } = body;
      if (username) {
        const user = await UserModel.findOne({ username });
        if (user) throw { message: "Username already used" };
      }

      if (password) {
        const hashedPassword = bcrypt.hash(password, 9);
        return UserModel.findOneAndUpdate(
          { _id: userId },
          { password: hashedPassword }
        );
      }
      if (friend) {
        return UserModel.findOneAndUpdate(
          { _id: userId },
          {
            $push: {
              friends: friend,
            },
          }
        );
      }

      return UserModel.findOneAndUpdate({ _id: userId }, body);
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
