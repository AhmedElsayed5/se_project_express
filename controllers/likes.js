const ClothingItem = require("../models/clothingItem");
const { handleError } = require("../utils/config");

const likeItem = (req, res) => {
  console.log("here");
  console.log(req.params.id);
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.params._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
    .orFail()
    .then((item) => res.status(200).send({ item }))
    .catch((e) => {
      console.log(e);
      // res.status(500).send({ message: "Error from like Item", e });
      handleError(req, res, e);
    });
};
const dislikeItem = (req, res) => {
  console.log(req.params.id);
  ClothingItem.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.params._id } }, // remove _id from the array
    { new: true },
  )
    .orFail()
    .then((item) => res.status(200).send({ item }))
    .catch((e) => {
      // res.status(500).send({ message: "Error from dislike Item", e });
      handleError(req, res, e);
    });
};

module.exports = {
  likeItem,
  dislikeItem,
};
