import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
// import encrypt from "mongoose-encryption";

dotenv.config();

const secretMessageSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    keyword: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

secretMessageSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

secretMessageSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// const encKey = process.env.SOME_32BYTE_BASE64_STRING;
// const sigKey = process.env.SOME_64BYTE_BASE64_STRING;

// secretMessageSchema.plugin(encrypt, {
//   encryptionKey: encKey,
//   signingKey: sigKey,
//   encryptedFields: ["message"],
// });

const SecretMessage = mongoose.model("SecretMessage", secretMessageSchema);

export default SecretMessage;
