import mongoose from "mongoose";

// Function to connect to the database
mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB
        const connection = await mongoose.connect(process.env.DB || "mongodb://127.0.0.1:27017/Chat_Application", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Log successful connection
        if (connection) {
            console.log(`Connected to MongoDB: ${connection.connection.host}`);
        }
    } catch (error) {
        // Log the error and exit the process
        console.error("Failed to Connect to Database:", error.message);
        console.error("COULD NOT CONNECT TO DB");
        process.exit(1);
    }
};

export default connectDB;
