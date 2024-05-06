const expres = require("express");
const router = expres.Router();
const authController = require("../../controllers/auth.controlller");
const asyncWrapper = require("../../utils/asyncWrapper");

router.route("/login").post(authController.login);
router.route("/logout").post(authController.logout);
router.route("/signup").post(authController.register);

module.exports = router;
