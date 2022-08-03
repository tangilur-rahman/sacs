// external modules
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// internal modules
const adminModel = require("./../models/administratorModel");
const advisorModel = require("./../models/advisorModel");
const studentModel = require("./../models/studentModel");

//  "/login"
const checkLogin = async (req, res) => {
	const { id_or_email, password } = req.body;

	if (id_or_email && password) {
		try {
			let checkExist = null;

			if (checkExist === null) {
				checkExist = await adminModel.findOne({
					$or: [{ email: id_or_email }, { id: id_or_email }]
				});

				if (checkExist === null) {
					checkExist = await advisorModel.findOne({
						$or: [{ email: id_or_email }, { id: id_or_email }]
					});
					if (checkExist === null) {
						checkExist = await studentModel.findOne({
							$or: [{ email: id_or_email }, { id: id_or_email }]
						});
					}
				}
			}

			const comparePassword = await bcrypt.compare(
				password,
				checkExist.password
			);

			if (comparePassword) {
				// create token
				const token = await jwt.sign(
					{ mongodb_id: checkExist._id, id: checkExist.id },
					process.env.SECRET_KEY,
					{ expiresIn: "365d" }
				);

				checkExist.tokens = [].concat({ token: token });

				await checkExist.save();

				await res.cookie(process.env.COOKIES_NAME, token, {
					expires: new Date(Date.now() + 31556952000)
				});

				res.status(200).json({ message: "Welcome to dashboard" });
			} else {
				res.status(400).json({ message: "Authentication Failed!" });
			}
		} catch (error) {
			res.status(500).json({ error: "Invalid Account!" });
		}
	} else {
		res.status(400).json({ message: "Fill-up all fields!" });
	}
};

module.exports = checkLogin;
