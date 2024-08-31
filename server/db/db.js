
import mongoose from "mongoose";

// Function to connect to the database
mongoose.set('strictQuery',false)
const connectDB = async () =>{
    try {
        const {connection} = await mongoose.connect(process.env.DB || "mongodb://127.0.0.1:27017/Chat_Application")
        if(connection){
            console.log(`Connected to MongoDB: ${connection.host}`)
        }
    } catch (error) {
        console.log("Fail to Connect Database",error)
        console.log("COULD NOT CONNECT TO DB");
        process.exit(1)
    }
}


export default connectDB;

