import express from "express";
const router = express.Router();
import {
  getSecretMessage,
  createSecretMessage,
  deleteSecretMessage,
  getSecretMessageUrlById,
} from "../controllers/secretMessageController.js";
import { protect } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(protect, getSecretMessage)
  .post(protect, createSecretMessage)
  .delete(protect, deleteSecretMessage);
router.route("/:id").get(protect, getSecretMessageUrlById);

export default router;
