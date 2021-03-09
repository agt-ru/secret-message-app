import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      secretMessages: user.secretMessages,
      token: generateToken(user._id),
    });
  } else {
    res.status(401); // unauthorized
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users/
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const secretMessages = [];

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    secretMessages,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      secretMessages,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    let myUser = await User.findById(req.user._id).populate(
      "secretMessages",
      "id keyword"
    );
    const urls = [];
    console.log(req.headers.host);
    const urlHost =
      process.env.NODE_ENV === "development"
        ? "localhost:3000"
        : req.headers.host;
    myUser.secretMessages.forEach((msg) => {
      urls.push(`http://${urlHost}/${msg.keyword}`);
    });
    res.json({
      _id: myUser._id,
      name: myUser.name,
      email: myUser.email,
      secretMessages: myUser.secretMessages,
      urls: urls,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      secretMessages: updatedUser.secretMessages,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
  let users = await User.find({});
  users = users.map((user) => ({ _id: user._id, name: user.name }));
  res.json(users);
});

// @desc    Update user -- add a secret message
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (req.body.secretMessageId) {
      user.secretMessages.push(req.body.secretMessageId);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      secretMessages: updatedUser.secretMessages,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  updateUser,
};
