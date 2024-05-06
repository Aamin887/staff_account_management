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
    throw new Error("unable to create new user");
  }

  console.log(newUser);

  await createToken(res, {
    id: newUser._id,
    email: newUser.email,
  });

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
    throw new Error("user not found");
  }

  const checkPassword = decryptPassword(password, checkUser.password);

  if (checkPassword) {
    const token = createToken(res, {
      id: checkUser._id,
      email: checkUser.email,
    });

    return {
      userName: checkUser.userName,
      id: checkUser._id,
      email: checkUser.email,
    };
  } else {
    throw new Error("incorrect credentials");
  }
};

const logout = (res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: new Date(0), // 0 days
  });

  return { msg: "logout successful" };
};

module.exports = {
  register,
  login,
  logout,
};
