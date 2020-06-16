const express = require("express");
const routes = require("./routes/api");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost:27017/scraping", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// body parser needs to be used before routes to attach the json data to the request
app.use(bodyParser.json()); // first middleware
app.use("/scraping", routes); // second middleware
app.use(function (err, req, res, next) {
  // third middleware error handling
  res.status(422).send({ error: err.message });
});
const port = process.env.PORT || 5004;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
