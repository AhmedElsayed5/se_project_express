const router = require("express").Router();

const { getCurrentUser, updateUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

// CRUD
router.get("/user/me", auth, getCurrentUser);
router.patch("/user/me", auth, updateUser);

module.exports = router;
