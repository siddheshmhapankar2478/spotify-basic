const express = require("express");

const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

const {
  getMusicList,
  createMusic,
} = require("../controllers/music.controllers");
const { authArtist, authUser } = require("../middlewares/auth.middleware");

router.get("/list", authUser, getMusicList);

router.post("/create", authArtist, upload.single("music"), createMusic);

module.exports = router;
