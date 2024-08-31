// Import necessary models
import { User } from "../models/userModel.js";

// Controller to handle fetching all verified users
const peopleController = async (req, res) => {
  try {
    // Fetch all users with verified status
    const users = await User.find({ verified: true });

    // Send the list of verified users as a JSON response
    res.json(users);
    // console.log(users);
  } catch (error) {
    console.error("Error in peopleController:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};


export default peopleController;