const JWT = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token Missing" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (e) {
    res.status(401).json({ message: "Invalid Token", error: e.message });
  }
};

module.exports = { verifyToken };