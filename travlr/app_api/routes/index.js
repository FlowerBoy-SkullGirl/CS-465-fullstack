const express = require("express");
const router = express.Router();

const tripsController = require("../controllers/trips");
const authController = require("../controllers/authentication");

router.route("/register").post(authController.register);
//router.route("/login").post(authController.login);

// GET Tripslist
router
	.route("/trips")
	.get(tripsController.tripsList)
	.post(tripsController.tripsAddTrip);
	//Add Trip POST

// Get Trip code
// PUT Update trip
router
	.route("/trips/:tripCode")
	.get(tripsController.tripsFindByCode)
	.put(tripsController.tripsUpdateTrip);

module.exports = router;
