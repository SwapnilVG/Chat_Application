// Import necessary modules and models
import protect from "../middleware/protect.js";
import Message from "../models/messageModel.js";

// Controller to handle fetching messages between two users
const messageController = async (req, res) => {
  try {
    const { userId } = req.params;

    // Get user data using the protect middleware
    const userData = await protect(req);
    console.log("userData", userData);

    const ourUserId = userData._id;
    console.log("ourUserId", ourUserId);
    console.log("userId", userId);

    // Find messages between the two users
    const messages = await Message.find({
      sender: { $in: [userId, ourUserId] },
      recipient: { $in: [userId, ourUserId] },
    }).sort({ createdAt: 1 });

    // Send the messages as a JSON response
    res.json(messages);
    console.log("messages", messages);
  } catch (error) {
    console.error("Error in messageController:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};


export default messageController;