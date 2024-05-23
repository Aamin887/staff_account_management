const Account = require("../model/account.model");
const accountService = require("../services/account.services");
const asyncHandler = require("express-async-handler");

/**
 * Desc   Create a user account
 * Route  POST /v1/account
 * Access Private
 */
const createAccount = asyncHandler(async (req, res) => {
  const { accountType, password } = req.body;

  if (!accountType || !password) {
    res.status(400);
    throw new Error("Must fill all form fields");
  }

  const formData = {
    user: req.user.id,
    accountType,
    password,
  };

  const newAccount = await accountService.createAccount(res, formData);

  res.json({ newAccount });
});

/**
 * Desc   Retrieve all user account
 * Route  GET /v1/account
 * Access Private
 */
const getUserAccounts = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    res.status(404);
    throw new Error("no users id available");
  }
  const userAccounts = await accountService.getUserAccounts(res, userId);

  res.json(userAccounts);
});

/**
 * Desc   Update a user account
 * Route  PUT /v1/account/accountId
 * Access Private
 */
const updateAccount = asyncHandler(async (req, res) => {
  const userId = req.user;
  const accountId = req.params.accountId;
  const formData = req.body;

  const updatedAccount = await accountService.updateAccount(
    res,
    userId,
    accountId,
    formData
  );

  res.json({ updatedAccount });
});

module.exports = {
  createAccount,
  getUserAccounts,
  updateAccount,
};
