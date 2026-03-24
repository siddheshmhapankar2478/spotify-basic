const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: { type: String, rquired: true, unique: true },
  username: { type: String, rquired: true, unique: true },
  password: { type: String, rquired: true },
  role: {
    type: String,
    rquired: true,
    enum: ["artist", "user"],
    default: "user",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
