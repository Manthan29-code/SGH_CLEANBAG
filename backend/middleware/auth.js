import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import BlackListToken from "../models/blackListTokenModel.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token || await BlackListToken.findOne({ token })) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token or token is blacklisted",
      });
    }


    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, user not found",
      });
    }

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Not authorized, token failed",
    });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Not authorized as an admin",
    });
  }
};

export const garbageCollector = (req, res, next) => {
  if (req.user && req.user.role === "garbage_collector") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Not authorized as a garbage collector",
    });
  }
};
