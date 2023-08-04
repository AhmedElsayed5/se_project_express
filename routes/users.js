const router = require("express").Router();
const User = require("../models/user");

const { getCurrentUser, updateUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

// CRUD
router.get("/me", getCurrentUser);
router.patch("/me", updateUser);

module.exports = router;
