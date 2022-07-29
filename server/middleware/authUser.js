// external modules
const jwt = require("jsonwebtoken");

// internal modules
const userModel = require("./../models/userModel");

const authUser = async (req, res, next) => {
	try {
		const user = await jwt.verify(
			req.cookies.sacsCookie,
			process.env.SECRET_KEY
		);

		const document = await userModel.findOne({
			_id: user.mongodb_id,
			id: user.id
		});

		req.userDocument = document;

		next();
	} catch (error) {
		res.status(400).json({ error: "Authentication Failed!" });
	}
};

module.exports = authUser;
