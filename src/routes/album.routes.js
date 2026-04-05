const express = require("express");
const router = express.Router();

const { createAlbum } = require("../controllers/album.controllers");

router.post("/create", createAlbum);

module.exports = router;
