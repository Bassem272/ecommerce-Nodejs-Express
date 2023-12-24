import jwt from "jsonwebtoken";
import User from "../models/user.js";

module.exports = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const user = await User.findOne({ _id: decoded.id });
    if (!user) {
      return res.status(401).json({ msg: "user not found" });
    }
    if(!user.token == token) {
      return res.status(401).json({ msg: "token does not belong to user" });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
