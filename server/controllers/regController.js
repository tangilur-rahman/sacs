const userModel = require("./../Models/userModel");
const bcrypt = require("bcrypt");

//  "/register"
const createNewUser = async (req, res) => {
	const {
		name,
		id,
		email,
		password,
		c_password,
		role,
		department,
		group,
		semester,
		year
	} = req.body;

	if (name && id && email && password && c_password) {
		try {
			// check ID Already Exists or not
			const checkId = await userModel.findOne({ id });

			if (checkId) {
				res.status(406).json({ error: "That Id Already Used" });
			} else {
				// check Email Already Exists or not
				const checkEmail = await userModel.findOne({ email });

				if (checkEmail) {
					res.status(406).json({ error: "That Email Already Used" });
				} else {
					// check password match or not
					if (password === c_password) {
						if (password.length < 8) {
							res
								.status(406)
								.json({ error: "Password must be minimum 8 length " });
						} else {
							const hashPassword = await bcrypt.hash(password, 10);
							const c_HashPassword = await bcrypt.hash(c_password, 10);

							if (role === "Administrator") {
								const document = await userModel({
									name,
									id,
									email,
									password: hashPassword,
									c_password: c_HashPassword,
									role
								});

								// save that document into mongoDB
								await document.save();
								res
									.status(200)
									.json({ message: "Add new administrator successfully" });
							} else {
								if (department && group && semester && year) {
									const document = await userModel({
										name,
										id,
										email,
										password: hashPassword,
										c_password: c_HashPassword,
										role,
										department,
										group,
										semester,
										year
									});

									// save that document into mongoDB
									await document.save();
									res
										.status(200)
										.json({ message: "Add new user successfully" });
								} else {
									res.status(422).json({ error: "Fill-up all fields" });
								}
							}
						}
					} else {
						res.status(401).json({ error: "Password Didn't Match 😣" });
					}
				}
			}
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	} else {
		res.status(422).json({ error: "Fill-up all fields" });
	}
};

module.exports = { createNewUser };
