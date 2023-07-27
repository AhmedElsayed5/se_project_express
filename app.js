const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;
const app = express();

const connectToMongo = async () => {
  try {
    mongoose.connect("mongodb://localhost:27017/wtwr_db");
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
  }
};
connectToMongo();
const routes = require("./routes");

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "64bdd05d0a611d2e55b1243f", // paste the _id of the test user created in the previous step
  };
  next();
});
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log("This is working");
});
