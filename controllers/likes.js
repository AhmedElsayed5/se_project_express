const ClothingItem = require("../models/clothingItem");
const NotFoundError = require("../errors/NotFoundError");

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError("No user with matching ID found");
    })
    .then((item) => res.send({ item }))
    .catch((err) => next(err));
};
const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError("No user with matching ID found");
    })
    .then((item) => res.send({ item }))
    .catch((err) => next(err));
};

module.exports = {
  likeItem,
  dislikeItem,
};
