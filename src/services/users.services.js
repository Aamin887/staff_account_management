const User = require("../model/users.model");

const getAllUsers = async (res) => {
  const users = await User.find({}).select("-password");

  if (users.length === 0) {
    res.status(404);
    throw new Error("No users found");
  }
  res.status(200);
  return users;
};

const getAUser = async (res, id) => {
  const user = await User.findOne({ _id: id }).select("-password");

  if (!user) {
    res.status(404);
    throw new Error(`No user with id: ${id} found`);
  }
  res.status(200);
  return user;
};

const editUser = async (res, id, formData) => {
  const user = await User.findOne({ _id: id }).select("-password");

  if (!user) {
    res.status(404);
    throw new Error(`no user with id ${id} found`);
  }

  const updatedUser = await User.findOneAndUpdate({ _id: id }, formData, {
    new: false,
  });

  if (!updatedUser) {
    res.status(400);
    throw new Error(`could not update user with id ${id}`);
  }

  const newUser = await User.findOne({ _id: id }).select("-password");
  res.status(200);
  return newUser;
};

const deleteUser = async (res, id) => {
  const checkUser = await User.findOne({ _id: id });

  if (!checkUser) {
    res.status(404);
    throw new Error(`user with id ${id} does not exist`);
  }

  const deletedUser = await User.findOneAndDelete({ _id: id });

  res.status(204);

  return deletedUser;
};

module.exports = {
  getAllUsers,
  getAUser,
  editUser,
  deleteUser,
};
