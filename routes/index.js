const router = require("express").Router();
const NotFoundError = require("../errors/NotFoundError");
const clothingItem = require("./clothingItems");
const user = require("./users");
const { login, createUser } = require("../controllers/users");

router.use("/items", clothingItem);
router.use("/users", user);
router.post("/login", login);
router.post("/signup", createUser);
router.use("*", (req, res, next) => {
  next(new NotFoundError("Page not found"));
});

module.exports = router;
