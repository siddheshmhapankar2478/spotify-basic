const express = require("express");

const router = express.Router();

const {
  getMusicList,
  createMusic,
} = require("../controllers/music.controllers");

router.get("/list", getMusicList);

router.post("/create", createMusic);

module.exports = router;
