import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import encrypt from "mongoose-encryption";

dotenv.config();

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    secretMessages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SecretMessage",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const encKey = process.env.SOME_32BYTE_BASE64_STRING;
const sigKey = process.env.SOME_64BYTE_BASE64_STRING;

userSchema.plugin(encrypt, {
  encryptionKey: encKey,
  signingKey: sigKey,
  excludeFromEncryption: ["secretMessages", "password"],
});

const User = mongoose.model("User", userSchema);

export default User;
