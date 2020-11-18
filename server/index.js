//importing libs
import "./common/env";
import socketIo from "socket.io";
import Express from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as http from "http";
import * as os from "os";
import cookieParser from "cookie-parser";
import "../server/common/mongo";
import l from "../server/common/logger";
import cors from "cors";

//importing routes
import Routes from "./routes";

//creating the app
const app = Express();
const port = process.env.PORT;
const server = http.Server(app);
const io = socketIo(server);

//setting middlewares
const root = path.normalize(`${__dirname}/../..`);
app.set("appPath", `${root}client`);
app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || "100kb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: process.env.REQUEST_LIMIT || "100kb",
  })
);
app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || "100kb" }));
app.use(cookieParser(process.env.SESSION_SECRET));
// app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

//adding Routes
Routes(app);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.emit("message", "Hello EveryOne");
});

//listening to port
server.listen(port, () =>
  l.info(
    `up and running in ${
      process.env.NODE_ENV || "development"
    } @: ${os.hostname()} on port: ${port}`
  )
);
