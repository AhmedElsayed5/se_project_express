const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { handleError, JWT_SECRET } = require("../utils/config");
const { ERROR_401, ERROR_409 } = require("../utils/errors");

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) =>
      res.send({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
        token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" }),
      }),
    )
    .catch((err) => {
      console.log(err);
      return res.status(ERROR_401).send({ message: "Login failed" });
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch((e) => handleError(req, res, e));
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email }).then((data) => {
    if (data)
      return res.status(ERROR_409).send({ message: "Email already exists" });
    return bcrypt
      .hash(password, 10)
      .then((hash) => User.create({ name, avatar, email, password: hash }))
      .then((item) => {
        res.send({
          data: {
            _id: item._id,
            name: item.name,
            email: item.email,
            avatar: item.avatar,
          },
          token: jwt.sign({ _id: item._id }, JWT_SECRET, { expiresIn: "7d" }),
        });
      })
      .catch((e) => {
        // console.log(e);
        handleError(req, res, e);
      });
  });
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { $set: { name, avatar } },
    { new: true, runValidators: true },
  )
    .then((item) => res.send({ name: item.name, avatar: item.avatar }))
    .catch((e) => handleError(req, res, e));
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUser,
};
