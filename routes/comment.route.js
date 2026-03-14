// import express from 'express';
// import { addComment } from '../controllers/comment.controller.js';
// import { auth } from '../middlewares/authMiddleware.js';
// const router = express.Router();

// router.post("/:postId", auth, addComment);
// export default router;
import express from "express";
import { addComment, getCommentsByPost, getMyComments } from "../controllers/comment.controller.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Add a comment
router.post("/", auth, addComment);

router.get("/me", auth, getMyComments);

// Get all comments for a post
router.get("/:postId", getCommentsByPost);

export default router;