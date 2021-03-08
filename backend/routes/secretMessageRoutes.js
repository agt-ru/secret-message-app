import express from "express";
const router = express.Router();
import {
  getSecretMessage,
  createSecretMessage,
  deleteSecretMessage,
} from "../controllers/secretMessageController.js";
import { protect } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(protect, getSecretMessage)
  .post(protect, createSecretMessage)
  .delete(protect, deleteSecretMessage);

export default router;
