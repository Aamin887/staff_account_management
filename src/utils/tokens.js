const jwt = require("jsonwebtoken");
const { assign } = require("nodemailer/lib/shared");

const createTokens = async (userData) => {
  const { id, email } = userData;

  const accessToken = jwt.sign(
    { id: id, email: email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );

  const refreshToken = jwt.sign(
    { id: id, email: email },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return { accessToken, refreshToken };
};

const verifyAccessToken = (accessToken) => {
  return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
};

const verifyRefreshToken = (token) => {};

module.exports = {
  createTokens,
  verifyAccessToken,
};
