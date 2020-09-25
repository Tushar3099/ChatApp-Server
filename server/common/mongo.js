import mongoose from "mongoose";
import l from "./logger";
mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("connected", () => {
  l.info("Database is connected");
});
mongoose.connection.on("error", () => {
  l.info("Error connecting with Databse");
});
