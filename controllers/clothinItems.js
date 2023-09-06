const { ERROR_403 } = require("../utils/errors");
const ClothingItem = require("../models/clothingItem");
const { handleError } = require("../utils/config");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user })
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      console.error(`error is : ${e}`);
      // res.status(500).send({ message: "Error from CreateItem", e });
      handleError(req, res, e);
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((e) => {
      handleError(req, res, e);
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (String(item.owner._id) !== req.user._id)
        return res
          .status(ERROR_403)
          .send({ message: "You are not authorized to delete this item" });

      return item.deleteOne().then(() => {
        res.send({ message: "Item deleted" });
      });
    })
    .catch((e) => {
      console.log(e);
      handleError(req, res, e);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
};
