const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //Model
const Model = mongoose.model('trips');

// GET /trips - list trips
// Always includes HTML status code
// and JSON message to client
const tripsList = async(req, res) => {
	const q = await Model
		.find({})
		.exec();

	// Display query results to console
	// console.log(q);

	if(!q)
	{
		return res
			.status(404)
			.json(err);
	}else{
		return res
			.status(200)
			.json(q);
	}

};

// GET /trips/:tripCode - list a single trip
// Always include HTML status code and JSON
const tripsFindByCode = async(req, res) => {
	const q = await Model
		.find({'code' : req.params.tripCode }) // Find record for corresponding trip code
		.exec();

		// Debug line
		// console.log(q);
	if (!q)
	{
		return res
			.status(404)
			.json(err);
	}else{
		return res
			.status(200)
			.json(q);
	}

};

//POST: /trips Add a new trip
// Always include HTML status and JSON message
const tripsAddTrip = async(req, res) => {
	const newTrip = new Trip({
		code: req.body.code,
		name: req.body.name,
		length: req.body.length,
		start: req.body.start,
		resort: req.body.resort,
		perPerson: req.body.perPerson,
		image: req.body.image,
		description: req.body.description
	});

	const q = await newTrip.save();

		if(!q){
			return res.status(400).json(err);
		}else{
			return res.status(200).json(q);
		}

	//console.log(q);
};

//PUT: /trips/:tripCode Updates a trip
// Always include HTML status and JSON message
const tripsUpdateTrip = async(req, res) => {

	console.log(req.params);
	console.log(req.body);

	const q = await Model
		.findOneAndUpdate(
			{ 'code' : req.params.tripCode },
			{
				code: req.body.code,
				name: req.body.name,
				length: req.body.length,
				start: req.body.start,
				resort: req.body.resort,
				perPerson: req.body.perPerson,
				image: req.body.image,
				description: req.body.description
			}
		)
		.exec();

	if(!q)
	{
		return res.status(400).json(err);
	}else{
		return res.status(201).json(q);
	}

	console.log(q);
};

module.exports = {
	tripsList,
	tripsFindByCode,
	tripsAddTrip,
	tripsUpdateTrip
};
