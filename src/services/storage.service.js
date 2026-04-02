const { ImageKit } = require("@imagekit/nodejs");

const uploadMusic = async (file) => {
  const client = new ImageKit({
    privateKey: process.env["IMAGEKIT_PRIVATE_KEY"], // This is the default and can be omitted
  });

  const response = await client.files.upload({
    file,
    fileName: `music_${Date.now()}`,
    folder: "spotify/music",
  });
  return response;
};
module.exports = uploadMusic;
