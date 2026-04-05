const albumModel = require("../models/album.models");

const createAlbum = async (req, res) => {
  const { title, music_ids } = req.body;
  const { id } = req.user;

  if (!title || !music_ids)
    return res
      .status(400)
      .json({ message: "title musics are required fields" });

  const album = await albumModel.create({ title, music_ids, artist: id });
  console.log({ album });
  return res.status(201).json({
    message: "Album Created Successfully",
    album: {
      id: album._id,
      title: album.title,
      artist: album.artist,
      music_ids: album.music_ids,
    },
  });
};

const getAlbumList = async (req, res) => {
  const albumList = await albumModel.find().select("title artist");
  return res
    .status(200)
    .json({ message: "Album Fetched Successfully", data: albumList });
};

const getAlbumById = async (req, res) => {
  const albumId = req.params.albumId;

  console.log({ albumId });

  const album = await albumModel
    .find({ _id: albumId })
    .populate("music_ids artist");
  console.log({ album });

  return res
    .status(200)
    .json({ message: "Album Fetched Successfully", data: album[0] });
};

module.exports = { createAlbum, getAlbumList, getAlbumById };
