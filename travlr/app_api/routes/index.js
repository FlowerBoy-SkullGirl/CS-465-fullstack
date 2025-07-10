const express = require("express");
const router = express.Router();

const tripsController = require("../controllers/trips");

// GET Tripslist
router
	.route("/trips")
	.get(tripsController.tripsList);

// Get Trip code
router
	.route("/trips/:tripCode")
	.get(tripsController.tripsFindByCode);

module.exports = router;
