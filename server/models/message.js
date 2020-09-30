import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: ObjectId,
      ref: "User",
    },
    content: {
      text: String,
      image: String,
      file: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessageSchema);
