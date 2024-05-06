const expres = require("express");
const accountController = require("../../controllers/accounts.controller");
const router = expres.Router();

router.post("/", accountController.createAccount);
router.get("/", accountController.getUserAccounts);
router.put("/:accountId", accountController.updateAccount);
// router.delete("/:accountId", accountService.deleteAccount);

module.exports = router;
