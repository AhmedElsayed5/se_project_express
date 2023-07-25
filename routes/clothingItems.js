const router = require("express").Router();

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
} = require("../controllers/clothingItems.js");

const { likeItem, dislikeItem } = require("../controllers/likes.js");

//CRUD

//Create
router.post("/", createItem);

//Read
router.get("/", getItems);

//Update
router.put("/:itemId", updateItem);

//Delete
router.delete("/:itemId", deleteItem);

// like Item
router.put("/:id/likes", likeItem);

// dislike Item
router.delete("/:id/likes", dislikeItem);

module.exports = router;
