const router = require("express").Router();

const auth = require("../middlewares/auth");
const {
  createItem,
  getItems,
  deleteItem,
} = require("../controllers/clothinItems");

const { likeItem, dislikeItem } = require("../controllers/likes");

router.get("/", getItems);
router.post("/", auth, createItem);
router.delete("/:itemId", auth, deleteItem);
router.put("/:id/likes", auth, likeItem);
router.delete("/:id/likes", auth, dislikeItem);

module.exports = router;
