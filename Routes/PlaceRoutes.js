const express = require("express");
const router = express.Router();
const Place = require("../Model/PlaceModel");

router.get("/places", async (req, res, next) => {
  try {
    const response = await Place.find();
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/places", async (req, res, next) => {
  try {
    const place = new Place(req.body);
    const response = await place.save();
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
