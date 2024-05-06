const User = require("../model/users.model");
const asyncHandler = require("express-async-handler");
const usersServices = require("../services/users.services");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await usersServices.getAllUsers();
  

  res.status(200).json({
    users,
  });
});

const getAUser = asyncHandler(async (req, res) => {
  const id = req.params.userId;

  const user = await usersServices.getAUser(id);

  res.json({ user });
});

const editUser = asyncHandler(async (req, res) => {
  const id = req.params.userId;
  const formData = req.body;

  const updatedUser = await usersServices.editUser(id, formData);

  res.json({
    updatedUser,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.userId;
  const deletedUser = await usersServices.deleteUser(id);

  res.sendStatus(204);
});

module.exports = {
  getAllUsers,
  getAUser,
  editUser,
  deleteUser,
};
