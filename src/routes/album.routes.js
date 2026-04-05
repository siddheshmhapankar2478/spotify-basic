const express = require("express");
const router = express.Router();

const {
  createAlbum,
  getAlbumList,
  getAlbumById,
} = require("../controllers/album.controllers");
const { authArtist, authUser } = require("../middlewares/auth.middleware");

router.post("/create", authArtist, createAlbum);

router.get("/list", authUser, getAlbumList);

router.get("/:albumId", authUser, getAlbumById);

module.exports = router;
