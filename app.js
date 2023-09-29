const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./middlewares/error-handler");

const { PORT = 3001 } = process.env;
const app = express();
app.use(cors());
const connectToMongo = async () => {
  try {
    mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
  }
};
connectToMongo();
const routes = require("./routes");

app.use(express.json());

app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log("This is working");
});
