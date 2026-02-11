import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
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

export const deletePost = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findOneAndDelete({_id: req.params.id, author: req.user.id});
    if(!post) return res.status(404).json({message: "Post not found or unauthorized"});
    res.status(200).json({message: "Post deleted successfully"});
}

export const likePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    post.dislikes.pull(req.user.id);
    post.likes.addToSet(req.user.id);
    await post.save();
    res.status(200).json({message: "Post liked successfully"});
    if(!post) return res.status(404).json({message: "Post not found"});
}

export const dislikePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    post.likes.pull(req.user.id);
    post.dislikes.addToSet(req.user.id);
    await post.save();
    res.status(200).json({message: "Post disliked successfully"});
    if(!post) return res.status(404).json({message: "Post not found"});
}