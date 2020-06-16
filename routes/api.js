const express = require("express");
const router = express.Router();
const scraper = require("../scraper");
const Allegro = require("../models/Allegro");
const jsonexport = require("jsonexport");
router.get("/", (req, res) => {
  res.json({
    message:
      "Use /scraping/allegro or /scraping/allegrocsv to get the json or csv data",
  });
});
// get a list of cars from the db
router.get("/:allegrocsv", (req, res) => {
  scraper.process(req.param.allegro).then((entires) => {
    jsonexport(entires, function (err, csv) {
      if (err) return console.log(err);
      res.send(csv);
    });
  });
});
router.get("/:allegro", (req, res) => {
  scraper.process(req.param.allegro).then((entires) => {
    res.json(entires);
  });
});

// add a new cars to the db
router.post("/:allegro", function (req, res, next) {
  scraper.process(req.param.allegro).then((entires) => {
    Allegro.create(entires)
      .then(function (allegro) {
        // once the object is saved to the db we call the send function
        res.send(allegro);
      })
      .catch(next); // creates an instance and saves it
  });
});

module.exports = router;
