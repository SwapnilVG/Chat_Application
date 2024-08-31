import express from 'express';
import { avatarController, getAllAvatars } from '../controllers/avatarController.js';

const router = express.Router();

// Route to create a new avatar
router.post("/", avatarController);

// Route to get all avatars
router.get("/all", getAllAvatars);

export default router;
