import express from 'express';
import { addComment } from '../controllers/comment.controller.js';
import { auth } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post("/:postId", auth, addComment);
export default router;