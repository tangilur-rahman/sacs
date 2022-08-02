// external modules
const jwt = require("jsonwebtoken");

// internal modules
const adminModel = require("./../models/administratorModel");
const advisorModel = require("./../models/advisorModel");
const studentModel = require("./../models/studentModel");

const authUser = async (req, res, next) => {
	try {
		const user = await jwt.verify(
			req.cookies.sacsCookie,
			process.env.SECRET_KEY
		);

		let document = null;

		if (document === null) {
			document = await adminModel.findOne({
				_id: user.mongodb_id,
				id: user.id
			});
			req.currentUser = document;

			if (document === null) {
				document = await advisorModel.findOne({
					_id: user.mongodb_id,
					id: user.id
				});
				req.currentUser = document;

				if (document === null) {
					document = await studentModel.findOne({
						_id: user.mongodb_id,
						id: user.id
					});
					req.currentUser = document;
					next();
				}
			} else {
				next();
			}
		} else {
			next();
		}
	} catch (error) {
		res.status(400).json({ error: "Authentication Failed!" });
	}
};

module.exports = authUser;
