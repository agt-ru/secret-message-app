import asyncHandler from "express-async-handler";
import { v4 as uuid } from "uuid";

import SecretMessage from "../models/secretMessageModel.js";

// @desc    Create a secret message
// @route   POST /api/secretmessages
// @access  Private
const createSecretMessage = asyncHandler(async (req, res) => {
  const { message, password } = req.body;

  let keyword,
    keywordExists = true;

  while (keywordExists) {
    keyword = uuid().slice(0, 6);
    keywordExists = await SecretMessage.findOne({ keyword });
  }

  const secretMessage = await SecretMessage.create({
    message,
    keyword,
    password,
  });

  if (secretMessage) {
    res.status(201).json({
      _id: secretMessage._id,
      message: secretMessage.message,
      keyword: secretMessage.keyword,
    });
  } else {
    res.status(400);
    throw new Error("Invalid secret message data");
  }
});

// @desc    Get secret message
// @route   GET /api/secretmessages
// @access  Private
const getSecretMessage = asyncHandler(async (req, res) => {
  const { keyword, password } = req.body;

  const secretMessage = await SecretMessage.findOne({ keyword });
  if (secretMessage && (await secretMessage.matchPassword(password))) {
    res.json({
      _id: secretMessage._id,
      message: secretMessage.message,
      keyword: secretMessage.keyword,
    });
  } else {
    res.status(404);
    throw new Error("Secret message not found");
  }
});

// @desc    Get secret message url by ID
// @route   GET /api/secretmessages/:id
// @access  Private
const getSecretMessageUrlById = asyncHandler(async (req, res) => {
  const secretMessage = await SecretMessage.findById(req.params.id).select(
    "-password"
  );

  if (secretMessage) {
    res.json({
      _id: secretMessage._id,
      url: `http://localhost:3000/${secretMessage.keyword}`,
    });
  } else {
    res.status(404);
    throw new Error("Secret message not found");
  }
});

// @desc    Delete secret message
// @route   DELETE /api/secretmessages
// @access  Private
const deleteSecretMessage = asyncHandler(async (req, res) => {
  const { keyword, password } = req.body;

  const secretMessage = await SecretMessage.findOne({ keyword });

  if (secretMessage && (await secretMessage.matchPassword(password))) {
    await secretMessage.remove();
    res.json({ message: "Secret message removed" });
  } else {
    res.status(404);
    throw new Error("Secret message not found");
  }
});

export {
  createSecretMessage,
  deleteSecretMessage,
  getSecretMessage,
  getSecretMessageUrlById,
};
