import AuthRouter from "./api/controllers/auth/router";
import UserRouter from "./api/controllers/user/router";

export default function routes(app) {
  app.use("/auth", AuthRouter);
  app.use("/user", UserRouter);
}
