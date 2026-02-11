import express from 'express';
import { uploadMiddleware } from '../utils/upload.js';
import { auth } from '../middlewares/authMiddleware.js';
import { getProfile, updateProfile } from '../controllers/user.controller.js';

const router = express.Router();

router.get("/me", auth, getProfile)

export default router