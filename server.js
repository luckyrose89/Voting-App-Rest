require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { pollRouter } = require("./routers/index");
const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MLAB_URI, {
    useNewUrlParser: true
  })
  .then(
    () => {
      console.log("Database is now connected");
    },
    err => {
      console.log("Cannot connect to database + ", err);
    }
  );

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/poll", pollRouter);
app.use((err, req, res, next) => {
  console.error(err);
  return res.send({ error: err.message });
});

app.get("/", (req, res) => {
  res.send("Welcome to Voting App API");
});
app.get("*", function(req, res) {
  res.status(404);
  res.send("Sorry the page you're looking for does not exist!");
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
