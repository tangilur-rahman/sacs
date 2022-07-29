const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//  "/login"
const checkLogin = async (req, res) => {
	const { id_or_email, password } = req.body;

	if (id_or_email && password) {
		try {
			const checkExist = await userModel.findOne({
				$or: [{ email: id_or_email }, { id: id_or_email }]
			});

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

				res.cookie("sacsCookie", token, {
					expires: new Date(Date.now() + 31556952000)
				});

				res.status(200).json({ message: "Welcome to dashboard" });
			} else {
				res.status(400).json({ error: "Authentication Failed!" });
			}
		} catch (error) {
			res.status(400).json({ error: "Invalid Account!" });
		}
	} else {
		res.status(400).json({ error: "Fill-up all fields!" });
	}
};

module.exports = checkLogin;
