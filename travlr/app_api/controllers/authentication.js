const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user');

const register = async(req, res) => {
	//Validate message and require all parameters
	if (!req.body.name || !req.body.email || !req.body.password) {
		return res
		.status(400)
		.json({"message": "All fields required"});
	}

	const user = new User(
		{
			name: req.body.name,
			email: req.body.email,
			password: ''
		});
	user.setPassword(req.body.password)
	const q = await user.save();

	if(!q)
	{
		//If no data returned
		return res
		.status(400)
		.json(err);
	} else {
		const token = user.generateJWT();
		return res
		.status(200)
		.json(token);
	}
};

module.exports = {
	register
};
