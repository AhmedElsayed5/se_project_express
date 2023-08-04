const router = require("express").Router();

const auth = require("../middlewares/auth");
const {
  createItem,
  getItems,
  deleteItem,
} = require("../controllers/clothinItems");

const { likeItem, dislikeItem } = require("../controllers/likes");

router.get("/", getItems);
router.post("/", createItem);
router.delete("/:itemId", deleteItem);
router.put("/:id/likes", likeItem);
router.delete("/:id/likes", dislikeItem);

module.exports = router;
