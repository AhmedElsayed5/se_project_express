const mongoose = require("mongoose");
const validator = require("validator");

const clothingItems = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  weather: {
    type: String,
    require: true,
  },
  imageURL: {
    type: String,
    require: true,
    validator: {
      validator: (v) => validator.isURL(v),
      message: "Link is not Valid",
    },
  },
});

module.exports = mongoose.model("clothingItems", clothingItems);
