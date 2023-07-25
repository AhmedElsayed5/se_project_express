const User = require("../models/user.js");
const { handleError } = require("../utils/config.js");

const createUser = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((e) => {
      // res.status(500).send({ message: "Error from CreateUser", e });

      handleError(req, res, e);
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((e) => {
      // res.status(500).send({ message: "Error from GetUsers", e });
      handleError(req, res, e);
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  console.log(userId);

  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((e) => {
      // res.status(500).send({ message: "Error from getUser", e });
      handleError(req, res, e);
    });
};
module.exports = { createUser, getUsers, getUser };
