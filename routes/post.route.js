import express from 'express';
import { uploadMiddleware } from '../utils/upload.js';
import { createPost, getAllPosts} from '../controllers/post.controller.js';
import { auth } from '../middlewares/authMiddleware.js';
import { getSinglePost, deletePost } from '../controllers/post.controller.js';
import { likePost, dislikePost, getMyPosts } from '../controllers/post.controller.js';

const router = express.Router();

router.post("/", auth, uploadMiddleware, createPost);

router.get("/", auth, getAllPosts);

router.get("/my-posts", auth, getMyPosts); // move this UP

router.get("/:id", auth, getSinglePost);

router.delete("/:id", auth, deletePost);

router.post("/like/:id", auth, likePost);

router.post("/dislike/:id", auth, dislikePost);

export default router;