const musicModel = require("../models/music.models");
const jwt = require("jsonwebtoken");
const ImageKit = require("@imagekit/nodejs");
const uploadMusic = require("../services/storage.service");

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

    const { title } = req.body;
    if (!title || !decoded.id)
      return res
        .status(400)
        .json({ message: "uri, title this fields are required" });

    const file = req.file;
    const result = await uploadMusic(file.buffer.toString("base64"));
    const music = await musicModel.create({
      uri: result.url,
      title,
      artist: decoded.id,
    });
    return res.status(201).json({
      message: "music uploaded successfully",
      music,
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { getMusicList, createMusic };
