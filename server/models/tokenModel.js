import mongoose from 'mongoose';

// Define the schema for the Token model
const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    unique: true,
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, default: () => Date.now() + 3600000 }, // 1 hour expiration
});

// Create the Token model
const Token = mongoose.model('Token', tokenSchema);

export default Token;
