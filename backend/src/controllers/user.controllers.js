import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { User } from "../models/user.models.js";
import { generateToken } from "../utils/jwt.utils.js";
import { cloudinary } from "../utils/cloudinary.utils.js";

// Signup
const signup = expressAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters" });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    generateToken(newUser._id, res);
    await newUser.save();
  }

  res.status(201).json({
    _id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    profilePic: newUser.profilePic,
  });
});

// Login
const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  generateToken(user._id, res);

  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    profilePic: user.profilePic,
  });
});

// Logout
const logout = expressAsyncHandler(async (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
});

// Update Profile
const updateProfile = expressAsyncHandler(async (req, res) => {
  const { profilePic } = req.body;
  const userId = req.user._id;

  // Validate input
  if (!profilePic) {
    return res.status(400).json({ message: "Profile picture is required." });
  }

  try {
    // Upload to Cloudinary without specifying a folder
    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    // Update user in database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true } // Return updated document
    );

    // Respond with updated user data
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Check Authentication
const checkAuth = expressAsyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Delete Account
const deleteAccount = expressAsyncHandler(async (req, res) => {
  const { email } = req.params; // Use path parameter for email
  const user = await User.findOne({ email }); // Use findOne to find the user by email

  if (user) {
    await User.deleteOne({ email }); // Delete user
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

export { signup, login, logout, updateProfile, checkAuth, deleteAccount };
