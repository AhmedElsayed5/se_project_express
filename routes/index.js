const router = require("express").Router();
const { ERROR_404 } = require("../utils/errors.js");
const clothingItem = require("./clothingItems");
const user = require("./users");

router.use("/items", clothingItem);
router.use("/users", user);

router.use("*", (req, res) => {
  res.status(ERROR_404).send({ message: "Page not found" });
});

router.use((req, res) => {
  console.log("here");
  res.status(500).send({ message: "Router not found" });
});

module.exports = router;
