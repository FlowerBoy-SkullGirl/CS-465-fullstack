const express = require("express");
const router = express.Router();

const tripsController = require("../controllers/trips");
const authController = require("../controllers/authentication");
const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
	console.log('In Middleware');
	
	const authHeader = req.headers['authorization'];
	console.log('Auth Header: ' + authHeader);
	
	if(authHeader == null)
	{
		console.log('Auth Header Required but not present!');
		return res.sendStatus(401);
	}

	let headers = authHeader.split(' ');
	if(headers.length < 1)
	{
		console.log('Not enough tokens in Auth Header: ' + headers.length);
		return res.sendStatus(501);
	}

	const token = authHeader.split(' ')[1];
	console.log('Token: ' + token);
	
	if(token == null)
	{
		console.log('Null Bearer Token');
		return res.sendStatus(401);
	}

	console.log(process.env.JWT_SECRET);
	console.log(jwt.decode(token));
	const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
		if(err)
		{
			return res.sendStatus(401).json('Token Validation Error!');
		}
		req.auth = verified;
	});
	next(); //Process hangs without next()
}

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

// GET Tripslist
router
	.route("/trips")
	.get(tripsController.tripsList)
	.post(authenticateJWT, tripsController.tripsAddTrip);
	//Add Trip POST

// Get Trip code
// PUT Update trip
router
	.route("/trips/:tripCode")
	.get(tripsController.tripsFindByCode)
	.put(authenticateJWT, tripsController.tripsUpdateTrip);

module.exports = router;
