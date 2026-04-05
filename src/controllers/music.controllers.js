const musicModel = require("../models/music.models");
const jwt = require("jsonwebtoken");
const ImageKit = require("@imagekit/nodejs");
const uploadMusic = require("../services/storage.service");

const getMusicList = async (req, res) => {
  const musicList = await musicModel.find().populate("artist");
  return res.status(200).json({ data: musicList });
};

const createMusic = async (req, res) => {
  const { title } = req.body;
  if (!title)
    return res
      .status(400)
      .json({ message: "uri, title this fields are required" });

  const file = req.file;
  const result = await uploadMusic(file.buffer.toString("base64"));
  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: req.user.id,
  });
  return res.status(201).json({
    message: "music uploaded successfully",
    music,
  });
};

module.exports = { getMusicList, createMusic };
