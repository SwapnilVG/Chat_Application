// Import necessary modules and models
import bcrypt from "bcrypt";
import { User, validateRegister } from "../models/userModel.js";
import  Token  from "../models/tokenModel.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

// Controller to handle user registration
const registerController = async (req, res) => {
  try {
    // Validate registration input
    const { error } = validateRegister(req.body);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    // Check if user with the given email already exists
    let user = await User.findOne({ email: req.body.email });

    if (user && user.verified) {
      return res
        .status(409)
        .send({ message: "User with given email already exists" });
    }
    if (user && user.verificationLinkSent) {
      return res
        .status(400)
        .send({
          message: "A verification link has been already sent to this Email",
        });
    }

    // Hash the password and save the user
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    user = await new User({ ...req.body, password: hashPassword }).save();

    // Generate a verification token and send an email
    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(16).toString("hex"),
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000, // 1 hour expiration
    }).save();

    const url = `${process.env.BASE_URL}/users/${user._id}/verify/${token.token}`;
    await sendEmail(user.email, "Verify Email", url);

    user.verificationLinkSent = true;
    await user.save();

    res
      .status(201)
      .send({ message: `Verification Email Sent to ${user.email}` });
  } catch (error) {
    console.error("Error in registerController:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export default registerController;