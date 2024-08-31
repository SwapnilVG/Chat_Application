import mongoose from 'mongoose';

// Define the schema for the Message model
const MessageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

// Create the Message model
const Message = mongoose.model('Message', MessageSchema);

export default Message;
