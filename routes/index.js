const router = require("express").Router();
const { ERROR_404 } = require("../utils/errors");
const clothingItem = require("./clothingItems");
const user = require("./users");
const { login, createUser } = require("../controllers/users");

router.use("/items", clothingItem);
router.use("/users", user);
router.post("/signin", login);
router.post("/signup", createUser);
router.use("*", (req, res) => {
  res.status(ERROR_404).send({ message: "Page not found" });
});

module.exports = router;
