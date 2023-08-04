const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Authorization error" });
  }

  const token = auth.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).send({ message: "Authorization error" });
  }

  req.user = payload;

  next();
};
