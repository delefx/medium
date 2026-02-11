import User from "../models/user.model.js"

export const getProfile = async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    if(!user) return res.status(404).json({message: "User not found"});
    res.status(200).json({message: "Profile retrieved successfully", user});
}

export const updateProfile = async (req, res) => {
    const { fullname, username, email, avatar, bio } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, {
        fullname,
        username,
        email,
        avatar,
        bio
    }, {new: true}).select("-password");
    if(!user) return res.status(404).json({message: "User not found"});
    res.status(200).json({message: "Profile updated successfully", user});
}