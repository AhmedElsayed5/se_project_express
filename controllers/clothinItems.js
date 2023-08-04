const ClothingItem = require("../models/clothingItem");
const { handleError } = require("../utils/config");

console.log(handleError);

const createItem = (req, res) => {
  // console.log("here", req);
  console.log(req.body);
  console.log(req.body._id);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.body._id })
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
    .then((items) => res.status(200).send(items))
    .catch((e) => {
      // res.status(500).send({ message: "Error from GetItems", e });
      handleError(req, res, e);
    });
};

// const updateItem = (req, res) => {
//   const { itemId } = req.params;
//   const { imageUrl } = req.body;
//   console.log(itemId, imageUrl);
//   ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
//     .orFail()
//     .then((item) => res.status(200).send({ data: item }))
//     .catch((e) => {
//       //res.status(500).send({ message: "Error from updateItem", e });
//       handleError(req, res, e);
//     });
// };

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      // if (String(item.owner) !== req.body._id)
      // return res
      //   .status(403)
      //   .send({ message: "You are not authorized to delete this item" });
      // else
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
