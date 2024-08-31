// Import necessary modules and models
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

// Controller to handle fetching user profile information
export const profileController = async (req, res) => {
  try {
    const token = req.cookies?.authToken;

    if (token) {
      jwt.verify(token, process.env.JWTPRIVATEKEY, {}, async (err, userData) => {
        if (err) {
          throw err;
        }

        const user = await User.findOne({ _id: userData._id });
        res.json(user);
      });
    } else {
      res.status(401).json("No token");
    }
  } catch (error) {
    console.error("Error in profileController:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to handle updating user profile information
export const profileUpdate = async (req, res) => {
  try {
    const token = req.cookies?.authToken;

    if (token) {
      jwt.verify(token, process.env.JWTPRIVATEKEY, {}, async (err, userData) => {
        if (err) {
          throw err;
        }

        const { firstName, lastName, email, avatarLink } = req.body;
        const user = await User.findOne({ email });

        if (user) {
          user.firstName = firstName;
          user.lastName = lastName;
          user.email = email;
          user.avatarLink = avatarLink;
          await user.save();
          res.json(user);
        } else {
          res.status(404).json({ message: "User not found" });
        }
      });
    } else {
      res.status(401).json("No token");
    }
  } catch (error) {
    console.error("Error in profileUpdate:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

