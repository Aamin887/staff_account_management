const expres = require("express");
const router = expres.Router();

router.get("/", (req, res) => {
  res.send("Hello, accounts");
});

module.exports = router;
