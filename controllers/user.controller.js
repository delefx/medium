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

export const deleteUser = async (req, res) => {
  try {

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "User deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      message: "Failed to delete user"
    });
  }
};

export const getallUsers = async (req, res) => {
    const users = await User.find().select("-password");
    res.status(200).json({message: "Users retrieved successfully", users});
}