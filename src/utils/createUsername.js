const User = require("../model/users.model");

const createUsername = async (firstNames, lastName) => {
  const existUserFirstName = await User.findOne({ firstNames });
  const existUserLastName = await User.findOne({ lastName });
  let userName = "";
  if (existUserFirstName && existUserLastName) {
    userName = firstNames.slice(0, 2) + "_" + lastName;
  } else {
    userName = firstNames[0] + "_" + lastName;
  }
  return userName.toUpperCase();
};

module.exports = createUsername;
