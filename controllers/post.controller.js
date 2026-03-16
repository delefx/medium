import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";

export const createPost = async (req, res) => {

    console.log("FILES:", req.files);

    const { title, content } = req.body;
    const backCover = req.files?.backCover?.[0]?.path || null;

    const post = await Post.create({
        title,
        content,
        backCover: backCover,
        author: req.user.id,
    });
    res.status(201).json({message: "Post created successfully", post});
}

export const getAllPosts = async (req, res) => {
    const posts = await Post.find().populate("author", "-password").sort({createdAt: -1});
    res.status(200).json({message: "Posts retrieved successfully", posts});
}

export const getMyPosts = async (req, res) => {
    const posts = await Post.find({author: req.user.id}).populate("author", "-password").sort({createdAt: -1});
    res.status(200).json({message: "My posts retrieved successfully", posts});
}

export const getSinglePost = async (req, res) => {
    const { id } = req.params;

    const post = await Post.findById(id)
        .populate("author", "-password");

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
        message: "Post retrieved successfully",
        post
    });
};

export const deletePost = async (req, res) => {
  try {

    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.user.id
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found or unauthorized"
      });
    }

    await Comment.deleteMany({ post: req.params.id });

    res.status(200).json({
      message: "Post and its comments deleted"
    });

  } catch (err) {
    res.status(500).json({
      message: "Failed to delete post"
    });
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Remove from dislikes if it exists
    post.dislikes.pull(req.user.id);
    // Add to likes (no duplicates)
    post.likes.addToSet(req.user.id);

    await post.save();

    res.status(200).json({
      message: "Post liked successfully",
      likes: post.likes,
      dislikes: post.dislikes
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const dislikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Remove from likes if it exists
    post.likes.pull(req.user.id);
    // Add to dislikes
    post.dislikes.addToSet(req.user.id);

    await post.save();

    res.status(200).json({
      message: "Post disliked successfully",
      likes: post.likes,
      dislikes: post.dislikes
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};