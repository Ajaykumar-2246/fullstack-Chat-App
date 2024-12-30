import asyncHandler from "express-async-handler";
import { cloudinary } from "../utils/cloudinary.utils.js";
import { Message } from "../models/message.models.js";
import { User } from "../models/user.models.js";
import { getReceiverSocketId, io } from "../utils/soketio.js";

// Get users for sidebar
const getUsersForSidebar = asyncHandler(async (req, res) => {
  const loggedInUserId = req.user._id;

  const filteredUsers = await User.find({
    _id: { $ne: loggedInUserId },
  }).select("-password");

  res.status(200).json(filteredUsers);
});

// Get messages between two users
const getMessages = asyncHandler(async (req, res) => {
  const { id: userToChatId } = req.params;
  const myId = req.user._id;

  const messages = await Message.find({
    $or: [
      { senderId: myId, receiverId: userToChatId },
      { senderId: userToChatId, receiverId: myId },
    ],
  });

  res.status(200).json(messages);
});

// Send a new message
// Send a new message
const sendMessage = asyncHandler(async (req, res) => {
  const { text, image } = req.body;
  const receiverId = req.params.id; // Correctly used `receiverId`
  const senderId = req.user._id;

  let imageUrl;

  if (image) {
    const uploadResponse = await cloudinary.uploader.upload(image);
    imageUrl = uploadResponse.secure_url;
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    text,
    image: imageUrl,
  });

  await newMessage.save();

  // todo: realtime functionality goes here => socket.io
  const receiverSocketId = getReceiverSocketId(receiverId);
  // if user is online
  if (receiverSocketId) {
    // by this only the reciever will recieve the Msg
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }
  res.status(201).json(newMessage);
});

export { getUsersForSidebar, getMessages, sendMessage };
