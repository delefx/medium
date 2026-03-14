import express from 'express';
import { uploadMiddleware } from '../utils/upload.js';
import { auth } from '../middlewares/authMiddleware.js';
import { getProfile, updateProfile, getallUsers } from '../controllers/user.controller.js';

const router = express.Router();

router.get("/me", auth, getProfile)
router.get("/", auth, getallUsers)

router.put("/me", auth, uploadMiddleware, updateProfile)

export default router