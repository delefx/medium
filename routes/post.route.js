import express from 'express';
import { uploadMiddleware } from '../utils/upload.js';
import { createPost, getAllPosts } from '../controllers/post.controller.js';
import { auth } from '../middlewares/authMiddleware.js';
import { likePost, dislikePost, getMyPosts } from '../controllers/post.controller.js';

const router = express.Router();

router.post("/", uploadMiddleware, auth, createPost);
router.get("/", auth, getAllPosts);
router.post("/like/:id", auth, likePost);
router.post("/dislike/:id", auth, dislikePost);
router.get("/my-posts", auth, getMyPosts);

export default router;