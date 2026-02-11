import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    const { fullname, username, email, password } = req.body;

    const avatar = req.files?.avatar?.[0]?.path || null;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
        fullname,
        username,
        email,
        password: hashed,
        avatar: avatar,
    });

    res.status(201).json({message: "User registered successfully", user});
}

export const login = async (req, res) => {
    const{email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message: "User not found"});

    const match = await bcrypt.compare(password, user.password);
    if(!match) return res.status(400).json({message: "Invalid credentials"});

    const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn: "3d"});

    res.status(200).json({message: "Login successful", token});
}