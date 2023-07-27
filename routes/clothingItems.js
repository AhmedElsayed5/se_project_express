const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
} = require("../controllers/clothinItems");

const { likeItem, dislikeItem } = require("../controllers/likes");

// CRUD

// Create
router.post("/", createItem);

// Read
router.get("/", getItems);

// Delete
router.delete("/:itemId", deleteItem);

// like Item
router.put("/:id/likes", likeItem);

// dislike Item
router.delete("/:id/likes", dislikeItem);

module.exports = router;
