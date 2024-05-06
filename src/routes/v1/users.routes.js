const usersController = require("../../controllers/users.controller");
const expres = require("express");
const router = expres.Router();

router.get("/", usersController.getAllUsers);
router.get("/:userId", usersController.getAUser);
router.put("/:userId", usersController.editUser);
router.delete("/:userId", usersController.deleteUser);

module.exports = router;
