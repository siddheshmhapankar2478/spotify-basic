require("dotenv").config();

const app = require("./app");

const spotifyRoutes = require("./routes/spotify.routes");
app.use("/", spotifyRoutes);

// const connectDb=require('./db/db')
// connectDb();

app.listen(process.env.PORT, () => {
  console.log(`App is listening to PORT ${process.env.PORT}`);
});
