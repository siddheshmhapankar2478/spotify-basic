require("dotenv").config();

const app = require("./app");

const authRoutes = require("./routes/auth.routes");
app.use("/api", authRoutes);

const connectDb = require("./db/db");
connectDb();

app.listen(process.env.PORT, () => {
  console.log(`App is listening to PORT ${process.env.PORT}`);
});
