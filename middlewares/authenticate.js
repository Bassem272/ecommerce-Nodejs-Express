import jwt from "jsonwebtoken";
import User from "../models/user.js";

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: "Token is not valid" });
    }
    try {
      const user = User.findOne({ _id: decoded.id });
      if (!user) {
        return res.status(401).json({ msg: "user not found" });
      }
      req.user = user;
      next(); 
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });
};
