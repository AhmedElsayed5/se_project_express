const User = require("../models/user");
const { handleError, JWT_SECRET } = require("../utils/config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) =>
      res.send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" }),
      }),
    )
    .catch((err) => {
      console.log(err);
      return res.status(401).send({ message: "Login failed" });
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.body._id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((e) => handleError(req, res, e));
};

const createUser = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, avatar, email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (user) return res.status(409).send({ message: "Email already exists" });
    return bcrypt
      .hash(password, 10)
      .then((hash) => User.create({ name, avatar, email, password: hash }))
      .then((user) => {
        res.send({
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
          },
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
    req.body._id,
    { $set: { name, avatar } },
    { new: true, runValidators: true },
  )
    .then((item) => res.send({ name: item.name, avatar: item.avatar }))
    .catch((e) => handleError(req, res, e));
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
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
module.exports = {
  createUser,
  getUsers,
  getUser,
  login,
  getCurrentUser,
  updateUser,
};
