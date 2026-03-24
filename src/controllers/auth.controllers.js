const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userModel = require("../models/user.models");

const registerUser = async (req, res) => {
  const { email, username, password, role = "user" } = req.body || {};
  if (!email || !username || !password || !role)
    return res.status(400).json({
      message: "email, username, password and role are required fields",
    });

  const isEmailAlreadyPresent = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isEmailAlreadyPresent)
    return res
      .status(409)
      .json({ message: "Username or Email Already Present" });
  const hash = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    email,
    username,
    password: hash,
    role,
  });
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
  );
  res.cookie("token", token);

  return res.status(201).json({
    message: "User Registered Successfully",
    user: { id: user.id, role: user.role, username: user.username },
  });
};

const loginUser = async (req, res) => {
  const { username, email, password } = req.body || {};
  if ((!username && !email) || !password)
    return res.status(400).json({
      message: "username or email and password  are required fields",
    });

  const user = await userModel.findOne({ $or: [{ email }, { username }] });

  if (!user) return res.status(400).json({ message: "User doesnot exist" });

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
    );
    res.cookie("token", token);

    return res.status(200).json({
      message: "User Logged In Successfully",
      user: { id: user.id, role: user.role, username: user.username },
    });
  } else {
    return res.status(400).json({
      message: "Password is incorrect",
    });
  }
};

module.exports = { registerUser, loginUser };
