import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    code: String,
    type: { type: String, enum: ["text", "file", "audio"], required: true },
    text: String,
    filename: String,
    fileData: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Content", schema);
