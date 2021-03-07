// put some initial data in the db
import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

import users from "./data/users.js";
import secretMessages from "./data/secretMessages.js";
import User from "./models/userModel.js";
import SecretMessage from "./models/secretMessageModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await SecretMessage.deleteMany();

    const createdSecretMessages = await SecretMessage.insertMany(
      secretMessages
    );
    const sampleSecretMessage = createdSecretMessages[0]._id;

    const sampleUsers = users.map((user) => {
      return {
        ...user,
        secretMessages: [sampleSecretMessage],
      };
    });

    await User.insertMany(sampleUsers);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await SecretMessage.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

// import command: node backend/seeder
// destroy command: node backend/seeder -d
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
