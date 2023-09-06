const ClothingItem = require("../models/clothingItem");
const { handleError } = require("../utils/config");

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.send({ item }))
    .catch((e) => {
      console.log(e);
      handleError(req, res, e);
    });
};
const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.send({ item }))
    .catch((e) => {
      handleError(req, res, e);
    });
};

module.exports = {
  likeItem,
  dislikeItem,
};
