import express from "express";
import { protectRoute } from "../middleware/protectRoute.middleware.js";
import {
  getUsersForSidebar,
  getMessages,
  sendMessage,
} from "../controllers/message.controllers.js";

const router = express.Router();

// Route to get users for the sidebar

router.get("/users", protectRoute, getUsersForSidebar);


// Route to get messages with a specific user
router.get("/:id", protectRoute, getMessages);

// Route to send a message
router.post("/send/:id", protectRoute, sendMessage);

export default router;
