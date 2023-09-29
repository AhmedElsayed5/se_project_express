const { ERROR_400, ERROR_404, ERROR_500 } = require("./errors");

const handleError = (req, res, error) => {
  if (error.name === "ValidationError" || error.name === "CastError") {
    res.status(ERROR_400).send({
      message: "Invalid Data Input !",
    });
  } else if (error.name === "DocumentNotFoundError") {
    res.status(ERROR_404).send({
      message: "Error: Not Found",
    });
  } else {
    res.status(ERROR_500).send({
      message: "An error has occurred on the server.",
    });
  }
};

const { JWT_SECRET = "supersecrettoken" } = process.env;

module.exports = { handleError, JWT_SECRET };
