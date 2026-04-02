const express = require("express");

const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

const {
  getMusicList,
  createMusic,
} = require("../controllers/music.controllers");

router.get("/list", getMusicList);

router.post("/create", upload.single("music"), createMusic);

module.exports = router;
