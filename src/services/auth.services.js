const User = require("../model/users.model");
const { encryptPassword, decryptPassword } = require("../utils/hashPassword");
const { createTokens } = require("../utils/tokens");
const createUsername = require("../utils/createUsername");

const register = async (res, formData) => {
  const {
    title,
    firstNames,
    lastName,
    staffId,
    department,
    employmentStatus,
    email,
    password,
  } = formData;

  const checkUserExists = await User.findOne({ email });

  if (checkUserExists) {
    res.status(409);
    throw new Error("User already registered");
  }

  const hashedPassword = encryptPassword(password);
  const userName = await createUsername(firstNames, lastName);

  const userData = {
    title,
    userName,
    firstNames,
    lastName,
    email,
    staffId,
    department,
    employmentStatus,
    password: hashedPassword,
  };

  const newUser = await User.create(userData);

  if (!newUser) {
    res.status(400);
    throw new Error("unable to create new user");
  }

  res.status(201);

  return "new user created";
};

// login service
const login = async (res, formData) => {
  const { email, password } = formData;

  const checkUser = await User.findOne({ email }).exec();

  if (!checkUser) {
    res.status(404);
    throw new Error("user not found");
  }

  const checkPassword = decryptPassword(password, checkUser.password);

  if (checkPassword) {
    const tokens = await createTokens({
      id: checkUser._id,
      email: checkUser.email,
    });

    const { accessToken, refreshToken } = tokens;

    await User.findOneAndUpdate({ _id: checkUser._id }, { refreshToken });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return accessToken;
  } else {
    res.status(401);
    throw new Error("incorrect credentials");
  }
};

const logout = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }); //no content

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }

  await User.findOneAndUpdate({ _id: foundUser._id }, { refreshToken: "" });

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "strict", // Prevent CSRF attacks
    // 0 days
  });

  res.sendStatus(204);
};

const refreshToken = () => {};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
};
