const authService = require("../services/auth.services.js");
const asyncWrapper = require("../utils/asyncWrapper.js");

const register = asyncWrapper((req, res) => {
  const { email, password, password1 } = req.body;

  console.log(req.body);

  if (!email || !password || !password1) {
    throw new Error("Fill in all fields");
  }

  const userRegister = authService.register();
  res.send(userRegister);
});

const login = (req, res) => {
  const userLogin = authService.login();
  res.send(userLogin);
};

module.exports = {
  register,
  login,
};
