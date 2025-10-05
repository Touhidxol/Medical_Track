import mongoose from "mongoose";
const { Schema, model } = mongoose;

const MessageSchema = new Schema({
  role: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const ChatSchema = new Schema({
  email: { type: String, required: true, index: true }, // link to user
  title: { type: String, required: true },
  messages: [MessageSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// auto update updatedAt before save
ChatSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Chat || model("Chat", ChatSchema);
