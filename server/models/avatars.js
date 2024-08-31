import mongoose from 'mongoose';

// Define the schema for the Avatar model
const AvatarSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      required: true,
      default: "https://i.imgur.com/qGsYvAK.png",
    },
  },
  { timestamps: true }
);

// Create the Avatar model
const Avatar = mongoose.model('Avatar', AvatarSchema);

export default Avatar;
