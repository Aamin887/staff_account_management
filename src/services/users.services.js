const User = require("../model/users.model");

const getAllUsers = async () => {
  const users = await User.find({}).select("-password");

  if (users.length === 0) {
    throw new Error("No users found");
  }

  return users;
};

const getAUser = async (id) => {
  const user = await User.findOne({ _id: id }).select("-password");
  if (!user) {
    throw new Error(`No user with id: ${id} found`);
  }
  return user;
};

const editUser = async (id, formData) => {
  const user = await User.findOne({ _id: id }).select("-password");
  if (!user) {
    throw new Error(`no user with id ${id} found`);
  }

  const updatedUser = await User.findOneAndUpdate({ _id: id }, formData, {
    new: false,
  });

  if (!updatedUser) {
    throw new Error(`could not update user with id ${id}`);
  }

  const newUser = await User.findOne({ _id: id }).select("-password");

  return newUser;
};

const deleteUser = async (id) => {
  const checkUser = await User.findOne({ _id: id });

  if (!checkUser) {
    throw new Error(`user with id ${id} does not exist`);
  }

  const deletedUser = await User.findOneAndDelete({ _id: id });

  console.log(deletedUser);

  return deletedUser;
};

module.exports = {
  getAllUsers,
  getAUser,
  editUser,
  deleteUser,
};
