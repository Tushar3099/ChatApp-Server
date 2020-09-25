import UserModel from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import SendOtp from "sendotp";
const sendOtp = new SendOtp(process.env.OTP_AUTH_KEY);

export class AuthService {
  async login(userDetail) {
    try {
      if (!userDetail.username || !userDetail.password)
        throw { message: "Fill all the fields" };
      const user = await UserModel.findOne({
        username: userDetail.username,
      });
      if (!user) throw { message: `Wrong credentials` };
      const isSame = await bcrypt.compare(userDetail.password, user.password);
      if (!isSame) throw { message: `Wrong credentials` };
      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET
      );
      user.password = undefined;
      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  async signin(userDetail) {
    try {
      const { username, name, password, phoneNumber } = userDetail;
      if (!username || !password || !name || !phoneNumber)
        throw { message: "Fill all the required fields" };
      const user = await UserModel.findOne({ username });
      if (user) throw { message: `Username already used` };

      const hashedPassword = await bcrypt.hash(password, 9);

      const newUser = await UserModel.create({
        name,
        username,
        password: hashedPassword,
        phoneNumber,
      });

      const token = jwt.sign(
        { id: newUser._id, username: newUser.username },
        process.env.JWT_SECRET
      );
      newUser.password = undefined;
      return { user: newUser, token };
    } catch (error) {
      throw error;
    }
  }
  async generateOtp(phoneNumber) {
    try {
      // sendOtp.send(phoneNumber, "USERABC", (error, data) => {
      //   if (error) throw error;
      //   console.log(data);
      // });
      return true;
    } catch (error) {
      throw error;
    }
  }
  async verifyOtp(phoneNumber, otp) {
    try {
      console.log(phoneNumber);
      console.log(otp);
      if (!otp) throw { message: "OTP not provided" };
      if (otp != "0000") throw { message: "Invalid OTP" };
      // sendOtp.send(phoneNumber, "USERABC", (error, data) => {
      //   if (error) throw error;
      //   console.log(data);
      // });
      return true;
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
