const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const UnauthorizedError = require("../errors/UnauthorizedError");
const NotFoundError = require("../errors/NotFoundError");
const ConflictError = require("../errors/ConflictError");
const BadRequestError = require("../errors/BadRequestError");
const { JWT_SECRET } = require("../utils/config");

const login = (req, res, next) => {
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
    .catch(() => {
      next(new UnauthorizedError("Incorrect email or password"));
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError("No user with matching ID found");
    })
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email }).then((data) => {
    if (data) throw new ConflictError("Email already exists");
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
        if (e.name === "ValidationError")
          next(new BadRequestError("Data is not Valid"));
        next(e);
      });
  });
};

const updateUser = (req, res, next) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { $set: { name, avatar } },
    { new: true, runValidators: true },
  )
    .then((item) => res.send({ name: item.name, avatar: item.avatar }))
    .catch(() => {
      next(new NotFoundError("No user with matching ID found"));
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUser,
};
