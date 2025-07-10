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

module.exports = {
	tripsList,
	tripsFindByCode
};
