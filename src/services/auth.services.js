const User = require("../model/users.model");
const { encryptPassword, decryptPassword } = require("../utils/hashPassword");
const { createToken } = require("../utils/accessToken");
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

  await createToken(res, {
    id: newUser._id,
    email: newUser.email,
  });

  res.status(201);

  return {
    userName: newUser.userName,
    id: newUser._id,
    email: newUser.email,
  };
};

const login = async (res, formData) => {
  const { email, password } = formData;

  const checkUser = await User.findOne({ email });

  if (!checkUser) {
    res.status(404);
    throw new Error("user not found");
  }

  const checkPassword = decryptPassword(password, checkUser.password);

  if (checkPassword) {
    createToken(res, {
      id: checkUser._id,
      email: checkUser.email,
    });
    res.status(202);
    return {
      userName: checkUser.userName,
      id: checkUser._id,
      email: checkUser.email,
    };
  } else {
    res.status(401);
    throw new Error("incorrect credentials");
  }
};

const logout = (res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: new Date(0), // 0 days
  });

  res.status(200);

  return { msg: "logout successful" };
};

module.exports = {
  register,
  login,
  logout,
};
