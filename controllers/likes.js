const ClothingItem = require("../models/clothingItem");
const { handleError } = require("../utils/config");

const likeItem = (req, res) => {
  console.log("here");
  console.log(req.user._id);
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
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
  console.log(req.params.id);
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // remove _id from the array
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
