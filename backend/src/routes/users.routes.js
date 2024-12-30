import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
  deleteAccount
} from "../controllers/user.controllers.js";
import { protectRoute } from "../middleware/protectRoute.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

router.delete("/delete-account/:email", protectRoute, deleteAccount);

export default router;
