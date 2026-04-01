const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user_name: { type: String, required: true },
    user_email: { type: String, unique: true, required: true },
    user_password: { type: String, required: true },
    user_age: { type: Number, required: true },
    user_gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male",
      required: true,
    },
    user_address: { type: String, required: true },
  },
  { timestamps: true },
);

const USER = mongoose.model("user", userSchema);

module.exports = USER;
