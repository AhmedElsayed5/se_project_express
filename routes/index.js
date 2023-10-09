const router = require("express").Router();
const NotFoundError = require("../errors/NotFoundError");
const clothingItem = require("./clothingItems");
const user = require("./users");
const { login, createUser } = require("../controllers/users");
const {
  validateSignUpBody,
  validateLogInBody,
} = require("../middlewares/validation");

router.use("/items", clothingItem);
router.use("/users", user);
router.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});
router.post("/login", validateLogInBody, login);
router.post("/signup", validateSignUpBody, createUser);
router.use("*", (req, res, next) => {
  next(new NotFoundError("Page not found"));
});

module.exports = router;
