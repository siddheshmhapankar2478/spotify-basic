const jwt = require("jsonwebtoken");

const authArtist = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unaithorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { role } = decoded;
    if (role !== "artist")
      return res.status(403).json({ message: "You dont have access" });

    req.user = decoded;

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Unaithorized" });
  }
};

const authUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unaithorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { role } = decoded;
    if (role !== "user" && role !== "artist")
      return res.status(403).json({ message: "You dont have access" });

    req.user = decoded;

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Unaithorized" });
  }
};

module.exports = { authArtist, authUser };
