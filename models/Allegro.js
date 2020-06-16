const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// create Allegro Schema & model
// Schema
const AllegroSchema = new Schema({
  endingAt: {
    type: String,
  },

  model: {
    type: String,
  },

  Rokprodukcji: {
    // year
    type: String,
  },
  Przebieg: {
    //  migeagle
    type: String,
  },
  price: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  region: {
    type: String,
  },
  NumberVIN: {
    type: String,
  },
  link: {
    type: String,
  },
});
// Model represents the collection in the data base
// allegro will be a collection in the db
const Allegro = mongoose.model("allegro", AllegroSchema);
// allegro will get plurised so allegros is the collection
module.exports = Allegro;
