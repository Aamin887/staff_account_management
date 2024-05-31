const authService = require("../services/auth.services.js");
const User = require("../model/users.model.js");
const asyncHandler = require("express-async-handler");
const mailer = require("../utils/mailer.js");
const jwt = require("jsonwebtoken");

/**
 * @Desc     Register user
 * @Route   POST /api/auth/signup
 * @Access  Public
 */
const register = asyncHandler(async (req, res) => {
  const {
    title,
    firstNames,
    lastName,
    staffId,
    department,
    employmentStatus,
    email,
    password,
    password1,
  } = req.body;

  if (
    !firstNames ||
    !lastName ||
    !email ||
    !password ||
    !password1 ||
    !employmentStatus ||
    !department ||
    !title
  ) {
    res.status(400);
    throw new Error("Fill in all fields");
  }

  if (password !== password1) {
    res.status(400);
    throw new Error("Passwords do not match");
  }

  const formData = {
    title,
    firstNames,
    lastName,
    staffId,
    department,
    employmentStatus,
    email,
    password,
  };

  const userRegister = await authService.register(res, formData);

  mailer(email, firstNames);

  res.json({ userRegister });
});

/**
 * @Desc    Login user
 * @Route   POST /api/auth/login
 * @Access  Public
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    res.status(400);
    throw new Error("Fill in all form fields");
  }

  const accessToken = await authService.login(res, { email, password });

  res.json({ accessToken });
});

/**
 * @Desc    Logout user
 * @Route   POST /api/auth/logout
 * @Access  Public
 */
const logout = asyncHandler(async (req, res) => {
  return await authService.logout(req, res);
});

/**
 * @Desc    Logout user
 * @Route   POST /api/auth/logout
 * @Access  Public
 */
const refreshToken = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);

  const token = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken: token });

  console.log(foundUser);
  if (!foundUser) return res.sendStatus(401);

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser._id.toString() !== decoded.id) res.sendStatus(403);

    const accessToken = jwt.sign(
      {
        id: foundUser._id,
        email: foundUser.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    res.json({
      accessToken,
    });
  });
});

module.exports = {
  register,
  login,
  logout,
  refreshToken,
};
