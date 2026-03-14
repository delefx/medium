import Comment from "../models/comment.model.js";

export const addComment = async (req, res) => {
    const comment = await Comment.create({
        post: req.body.postId,
        user: req.user.id,
        text: req.body.text
    });
    res.status(201).json({message: "Comment added successfully", comment});
} 