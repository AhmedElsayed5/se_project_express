const router = require("express").Router();

const { createUser, getUsers, getUser } = require("../controllers/users");

// CRUD

// Create
router.post("/", createUser);

// Read
router.get("/", getUsers);

// Update
router.get("/:userId", getUser);

module.exports = router;