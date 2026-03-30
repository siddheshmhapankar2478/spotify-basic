const musicModel = require("../models/music.models");
const jwt = require("jsonwebtoken");
const ImageKit = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: process.env["IMAGEKIT_PRIVATE_KEY"],
});

const getMusicList = async (req, res) => {
  const musicList = await musicModel.find();
  return res.status(200).json({ data: musicList });
};

const createMusic = async (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, role } = decoded;
    console.log({ id });

    if (role !== "artist")
      return res.status(403).json({ message: "Access forbidden" });

    const { uri, title, artist } = req.body;
    if (!uri || !title || !artist)
      return res
        .status(400)
        .json({ message: "uri, title, artist this fields are required" });

    await musicModel.create({ uri, title, artist });

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { getMusicList, createMusic };
