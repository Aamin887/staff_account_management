const expres = require("express");
const router = expres.Router();
const authController = require("../../controllers/auth.controlller");

router.route("/login").post(authController.login);
router.route("/signup").post(authController.register);
router.route("/refresh").get(authController.refreshToken);
router.route("/logout").post(authController.logout);

module.exports = router;
