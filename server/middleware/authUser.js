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

		let admin = null;
		let advisor = null;
		let student = null;

		if (admin === null) {
			admin = await adminModel.findOne({
				_id: user.mongodb_id,
				id: user.id
			});
			req.currentUser = admin;

			if (admin === null) {
				advisor = await advisorModel.findOne({
					_id: user.mongodb_id,
					id: user.id
				});
				req.currentUser = advisor;

				if (advisor === null) {
					student = await studentModel.findOne({
						_id: user.mongodb_id,
						id: user.id
					});
					req.currentUser = student;

					if (student === null) {
						res.status(500).json({ error: "server-side error!" });
					} else {
						next();
					}
				} else {
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
