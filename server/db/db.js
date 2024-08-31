import mongoose from 'mongoose';

// Function to connect to the database
export default async function connectDB() {
  try {
    await mongoose.connect(process.env.DB);
    console.log("DB CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    console.log("COULD NOT CONNECT TO DB");
  }
}
