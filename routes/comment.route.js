
import express from "express";
import { addComment, getCommentsByPost, getMyComments, getAllComments } from "../controllers/comment.controller.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Add a comment
router.post("/", auth, addComment);

router.get("/me", auth, getMyComments);

// Get all comments for a post
router.get("/:postId", getCommentsByPost);

router.get("/", auth, getAllComments);

export default router;