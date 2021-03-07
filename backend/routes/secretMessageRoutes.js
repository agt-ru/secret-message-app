import express from "express";
const router = express.Router();
import {
  createSecretMessage,
  deleteSecretMessage,
  getSecretMessage,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, getUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .put(protect, updateUser);

export default router;
