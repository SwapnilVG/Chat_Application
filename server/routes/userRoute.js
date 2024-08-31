import express from 'express';
import registerController from '../controllers/registerController.js';
import loginController from '../controllers/loginController.js';
import verifyEmail from '../controllers/emailVerifyController.js';
import { profileController, profileUpdate } from '../controllers/profileController.js';
import messageController from '../controllers/messageController.js';
import peopleController from '../controllers/peopleController.js';

const router = express.Router();

// Route to register a new user
router.post("/register", registerController);

// Route to log in a user
router.post("/login", loginController);

// Route to verify email address
router.get("/:id/verify/:token", verifyEmail);

// Route to get the user profile
router.get("/profile", profileController);

// Route to get messages for a specific user
router.get("/messages/:userId", messageController);

// Route to get all users
router.get("/people", peopleController);

// Route to update user profile
router.put("/profile/update", profileUpdate);

export default router;
