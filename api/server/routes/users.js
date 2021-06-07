var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send({
    data: ["user1", "user2", "user3", "user4", "user5", "user6"],
  });
});

module.exports = router;
