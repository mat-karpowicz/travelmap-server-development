const mongoose = require("mongoose");

const requiredString = { type: String, required: true };

const placeSchema = new mongoose.Schema({
  title: requiredString,
  comment: requiredString,
  rating: { type: Number, min: 0, max: 5, required: true },
  longitude: { type: Number, min: -180, max: 180, required: true },
  latitude: { type: Number, min: -90, max: 90, required: true },
  img: { type: String },
  url: { type: String },
  type: requiredString,
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
