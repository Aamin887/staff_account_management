const authService = require("../services/auth.services.js");
const asyncHandler = require("express-async-handler");
const mailer = require("../utils/mailer.js");

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

  res.json({ userRegister });
});

/**
 * @Desc    Login user
 * @Route   POST /api/auth/login
 * @Access  Public
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  mailer();

  if (!email && !password) {
    res.status(400);
    throw new Error("Fill in all form fields");
  }

  const userLogin = await authService.login(res, { email, password });

  res.json({ userLogin });
});

/**
 * @Desc    Logout user
 * @Route   POST /api/auth/logout
 * @Access  Public
 */
const logout = asyncHandler(async (req, res) => {
  const userLogout = authService.logout(res);

  res.json(userLogout);
});

module.exports = {
  register,
  login,
  logout,
};
