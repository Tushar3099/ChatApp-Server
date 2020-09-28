import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const ChatSchema = new mongoose.Schema(
  {
    users: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: ObjectId,
        ref: "Message",
      },
    ],
    // media: [
    //   {
    //     type: String,
    //   },
    // ],
    // file: [
    //   {
    //     type: String,
    //   },
    // ],
  },
  { timestamps }
);

export default mongoose.model("Chat", ChatSchema);
