import Comment from "../models/comment.model.js";

// Add a new comment
export const addComment = async (req, res) => {
  try {
    const { postId, text } = req.body;

    if (!text || !postId) {
      return res.status(400).json({ message: "Post ID and text are required" });
    }

    let comment = await Comment.create({
      post: postId,
      user: req.user.id,
      text,
    });

    // Populate user immediately so frontend can use username/avatar
    comment = await comment.populate("user", "-password");

    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add comment" });
  }
};

// Get all comments for a post
export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("user", "-password")
      .sort({ createdAt: 1 }); // oldest first

    res.status(200).json({ comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};

export const getMyComments = async (req, res) => {
  const comments = await Comment.find({ user: req.user.id })
    .populate("post", "title")
    .sort({ createdAt: -1 });

  res.status(200).json({
    message: "User comments retrieved",
    comments
  });
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("user", "username avatar") // get username + avatar
      .populate("post", "title")           // get post title
      .sort({ createdAt: -1 });            // newest first

    res.status(200).json({
      message: "All comments retrieved",
      comments
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve comments" });
  }
};