const router = require("express").Router();

const auth = require("../middlewares/auth");
const {
  createItem,
  getItems,
  deleteItem,
} = require("../controllers/clothinItems");
const {
  validateCardBody,
  validateId,
  validateItemId,
} = require("../middlewares/validation");
const { likeItem, dislikeItem } = require("../controllers/likes");

router.get("/", getItems);
router.post("/", auth, validateCardBody, createItem);
router.delete("/:itemId", auth, validateItemId, deleteItem);
router.put("/:id/likes", auth, validateId, likeItem);
router.delete("/:id/likes", auth, validateId, dislikeItem);

module.exports = router;
