const ClothingItem = require("../models/clothingItem");
const NotFoundError = require("../errors/NotFoundError");
const BadRequestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user })
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      next(new BadRequestError("Data is not Valid"));
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(() => {
      next(new NotFoundError("No user with matching ID found"));
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (String(item.owner._id) !== req.user._id)
        throw new ForbiddenError("You are not authorized to delete this item");

      return item.deleteOne().then(() => {
        res.send({ message: "Item deleted" });
      });
    })
    .catch(() => {
      next(new BadRequestError("Data is not Valid"));
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
};
