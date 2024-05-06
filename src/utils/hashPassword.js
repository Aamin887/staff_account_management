const bcrypt = require("bcryptjs");

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

const decryptPassword = (password, hashedPassword) => {
  const checkPassword = bcrypt.compareSync(password, hashedPassword);
  return checkPassword;
};

module.exports = {
  encryptPassword,
  decryptPassword,
};
