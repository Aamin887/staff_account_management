const Account = require("../model/account.model");
const User = require("../model/users.model");

// add an acoount type, prevent user from create two account of thesame type
// create an account
const createAccount = async (formData) => {
  const { user, accountType, password } = formData;

  const checkUser = await User.findOne({ _id: user });

  if (!checkUser) {
    throw new Error(`user not found`);
  }

  const newAccount = await Account.create({
    user,
    accountType,
    password,
  });

  if (!newAccount) {
    throw new Error("unable to create an account");
  }

  return newAccount;
};

// retrieve all accounts by a user
const getUserAccounts = async (userId) => {
  const checkUser = await User.findOne({ _id: userId });
  if (!checkUser) {
    throw new Error(`user not found`);
  }

  const userAccounts = await Account.find({ user: userId });

  return userAccounts;
};

// update an account
const updateAccount = async (userId, accountId, formData) => {
  const checkUser = await User.findOne({ _id: userId });

  if (!checkUser) {
    throw new Error(`unable to find user with ID ${userId}`);
  }

  const checkAccount = await Account.findOne({ _id: accountId });

  if (!checkAccount) {
    throw new Error(`account not found`);
  }

  if (checkUser._id.toString() !== checkAccount.user.toString()) {
    throw new Error("not authorised to update this account");
  }

  const updatedAccount = await Account.findOneAndUpdate(
    { _id: accountId },
    formData,
    { new: false }
  );

  if (!updatedAccount) {
    throw new Error("could not update");
  }

  return await Account.findOne({ _id: accountId });
};

module.exports = {
  createAccount,
  updateAccount,
  getUserAccounts,
};
