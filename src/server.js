require("dotenv").config();

const app = require("./app");

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

const musicRoutes = require("./routes/music.routes");
app.use("/api/music", musicRoutes);

const connectDb = require("./db/db");
connectDb();

app.listen(process.env.PORT, () => {
  console.log(`App is listening to PORT ${process.env.PORT}`);
});
