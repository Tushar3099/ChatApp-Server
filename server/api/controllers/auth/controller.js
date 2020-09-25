import AuthService from "../../services/auth.service";

export class Controller {
  async login(req, res) {
    try {
      const { token, user } = await AuthService.login(req.body);
      res.send({
        status: "500",
        token,
        user,
        message: "Login Successfull",
      });
    } catch (error) {
      res.send({
        status: error.status || 404,
        message: error.message || "Some error Occured",
      });
    }
  }
  async signin(req, res) {
    try {
      const { token, user } = await AuthService.signin(req.body);
      res.send({
        status: "500",
        token,
        user,
        message: "Signup Successfull",
      });
    } catch (error) {
      res.send({
        status: error.status || 404,
        message: error.message || "Some error Occured",
      });
    }
  }
  async generateOtp(req, res) {
    try {
      const sent = await AuthService.generateOtp(req.query.phoneNumber);
      if (sent)
        res.send({
          status: "500",
          message: "OTP sent Successfully",
        });
    } catch (error) {
      res.send({
        status: error.status || 404,
        message: error.message || "Some error Occured",
      });
    }
  }
  async verifyOtp(req, res) {
    try {
      const verified = await AuthService.verifyOtp(
        req.body.phoneNumber,
        req.body.otp
      );
      if (verified)
        res.send({
          status: "500",
          message: "OTP verified Successfully",
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
