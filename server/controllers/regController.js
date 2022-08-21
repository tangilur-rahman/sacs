// external modules
const bcrypt = require("bcrypt");

// internal modules
const adminModel = require("./../models/administratorModel");
const advisorModel = require("./../models/advisorModel");
const studentModel = require("./../models/studentModel");

//  "/register"
const createNewUser = async (req, res) => {
	const {
		name,
		id,
		email,
		password,
		c_password,
		gender,
		role,
		department,
		semester,
		year
	} = req.body;

	if (name && id && email && password && c_password && gender && role) {
		try {
			if (password !== c_password) {
				res.status(400).json({ message: "Password doesn't match!" });
			} else if (password < 8) {
				res.status(400).json({ message: "Password must be minimum 8 length " });
			} else {
				// hash password
				const hashPassword = await bcrypt.hash(password, 10);

				if (role === "administrator") {
					// check id exists or not
					const checkIdAdmin = await adminModel.findOne({ id });
					const checkIdAdvisor = await advisorModel.findOne({ id });
					const checkIdStudent = await studentModel.findOne({ id });

					if (checkIdAdmin || checkIdAdvisor || checkIdStudent) {
						res.status(400).json({ message: "That Id already used" });
					} else {
						// check email exists or not
						const checkEmailAdmin = await adminModel.findOne({ email });
						const checkEmailAdvisor = await advisorModel.findOne({ email });
						const checkEmailStudent = await studentModel.findOne({ email });

						if (checkEmailAdmin || checkEmailAdvisor || checkEmailStudent) {
							res.status(400).json({ message: "That email already used" });
						} else {
							const document = await adminModel({
								name,
								id,
								email,
								gender,
								password: hashPassword,
								role
							});

							await document.save();

							res
								.status(200)
								.json({ message: "New administrator add successfully" });
						}
					}
				} else if (role === "advisor") {
					if (!(department && semester && year)) {
						res.status(400).json({ message: "Fill-up all fields!" });
					} else {
						// check id exists or not
						const checkIdAdmin = await adminModel.findOne({ id });
						const checkIdAdvisor = await advisorModel.findOne({ id });
						const checkIdStudent = await studentModel.findOne({ id });

						if (checkIdAdmin || checkIdAdvisor || checkIdStudent) {
							res.status(400).json({ message: "That Id already used" });
						} else {
							// check email exists or not
							const checkEmailAdmin = await adminModel.findOne({ email });
							const checkEmailAdvisor = await advisorModel.findOne({ email });
							const checkEmailStudent = await studentModel.findOne({ email });

							if (checkEmailAdmin || checkEmailAdvisor || checkEmailStudent) {
								res.status(400).json({ message: "That email already used" });
							} else {
								const document = await advisorModel({
									name,
									id,
									email,
									gender,
									password: hashPassword,
									role,
									department,
									semester,
									year
								});

								await document.save();

								res
									.status(200)
									.json({ message: "New advisor add successfully" });
							}
						}
					}
				} else if (role === "student") {
					if (!(department && semester && year)) {
						res.status(400).json({ message: "Fill-up all fields!" });
					} else {
						// check id exists or not
						const checkIdAdmin = await adminModel.findOne({ id });
						const checkIdAdvisor = await advisorModel.findOne({ id });
						const checkIdStudent = await studentModel.findOne({ id });

						if (checkIdAdmin || checkIdAdvisor || checkIdStudent) {
							res.status(400).json({ message: "That Id already used" });
						} else {
							// check email exists or not
							const checkEmailAdmin = await adminModel.findOne({ email });
							const checkEmailAdvisor = await advisorModel.findOne({ email });
							const checkEmailStudent = await studentModel.findOne({ email });

							if (checkEmailAdmin || checkEmailAdvisor || checkEmailStudent) {
								res.status(400).json({ message: "That email already used" });
							} else {
								// get my advisor
								const myAdvisor = await advisorModel.findOne({
									department,
									semester,
									year
								});

								const document = await studentModel({
									name,
									id,
									email,
									gender,
									password: hashPassword,
									role,
									department,
									semester,
									year,
									advisor: myAdvisor._id
								});

								await document.save();

								res
									.status(200)
									.json({ message: "New Student add successfully" });
							}
						}
					}
				}
			}
		} catch (error) {
			res.status(500).json({ error: "Invalid inputted values!" });
		}
	} else {
		res.status(400).json({ message: "Fill-up all fields!" });
	}
};

module.exports = { createNewUser };
