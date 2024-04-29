const expres = require("express");
const router = expres.Router();

router.get("/", (req, res) => {
  res.json("Hello, users");
});

module.exports = router;
