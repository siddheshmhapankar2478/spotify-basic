const jwt = require("jsonwebtoken");
const albumModel = require("../models/album.models");

const createAlbum = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ messsage: "Unnauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log({ decoded });
    const { role, id } = decoded;
    if (role !== "artist")
      return res
        .status(403)
        .json({ message: "You dont have access to create Album" });
    const { title, music_ids } = req.body;

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
  } catch (err) {
    console.error(err);
    return res.status(401).json({ messsage: "Unnauthorized" });
  }
};

module.exports = { createAlbum };
