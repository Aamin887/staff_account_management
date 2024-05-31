const asyncHandler = require("express-async-handler");
const User = require("../model/users.model");
const { verifyAccessToken } = require("../utils/tokens");

const userAuth = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers["authorization"] &&
    req.headers["authorization"].startsWith("Bearer")
  ) {
    token = req.headers["authorization"].split(" ")[1];
    try {
      const decoded = verifyAccessToken(token);
      req.user = await User.findById(decoded.id).select("-password").exec();
      next();
    } catch (error) {
      res.status(403);
      throw new Error("forbidden, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { userAuth };
