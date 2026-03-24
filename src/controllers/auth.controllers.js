const userModel = require("../models/user.models");

const registerUser = async (req, res) => {
  const { email, username, password, role } = req.body || {};
  const isEmailAlreadyPresent = userModel.findOne({
    $or: [{ email }, { username }],
  });
  if (isEmailAlreadyPresent)
    return res.status(500).json({ message: "Email Already Present" });

  await userModel.create({ email, username, password, role });
  return res.status(200).json({ message: "User Registered Successfully" });
};

const loginUser = async () => {};

module.exports = { registerUser, loginUser };
