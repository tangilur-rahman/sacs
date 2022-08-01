const userModel = require("./../models/userModel");
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
				res.status(400).json({ message: "That Id Already Used" });
			} else {
				// check Email Already Exists or not
				const checkEmail = await userModel.findOne({ email });

				if (checkEmail) {
					res.status(400).json({ message: "That Email Already Used" });
				} else {
					// check password match or not
					if (password === c_password) {
						if (password.length < 8) {
							res
								.status(400)
								.json({ message: "Password must be minimum 8 length " });
						} else {
							const hashPassword = await bcrypt.hash(password, 10);

							if (role === "Administrator") {
								const document = await userModel({
									name,
									id,
									email,
									password: hashPassword,
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
									res.status(400).json({ message: "Fill-up all fields!" });
								}
							}
						}
					} else {
						res.status(400).json({ message: "Password didn't match 😣" });
					}
				}
			}
		} catch (error) {
			res.status(500).json({ message: "Invalid Email or server-side error!" });
		}
	} else {
		res.status(400).json({ message: "Fill-up all fields!" });
	}
};

module.exports = { createNewUser };
