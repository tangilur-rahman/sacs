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
		min,
		max,
		year
	} = req.body;

	if (name && id && email && password && c_password && gender && role) {
		try {
			if (password !== c_password) {
				res.status(400).json({ message: "Password doesn't match!" });
			} else if (password < 8) {
				res.status(400).json({ message: "Password must be minimum length 8" });
			} else {
				// hash password
				const hashPassword = await bcrypt.hash(password, 10);

				if (role === "administrator") {
					// check that id exists or not
					const checkIdAdmin = await adminModel.findOne({ id });
					const checkIdAdvisor = await advisorModel.findOne({ id });
					const checkIdStudent = await studentModel.findOne({ id });

					if (checkIdAdmin || checkIdAdvisor || checkIdStudent) {
						res.status(400).json({ message: "That Id already used" });
					} else {
						// check that email exists or not
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
					if (!(department && min && max)) {
						res.status(400).json({ message: "Fill-up all fields!" });
					} else {
						// check that id exists or not
						const checkIdAdmin = await adminModel.findOne({ id });
						const checkIdAdvisor = await advisorModel.findOne({ id });
						const checkIdStudent = await studentModel.findOne({ id });

						if (checkIdAdmin || checkIdAdvisor || checkIdStudent) {
							res.status(400).json({ message: "That Id already used" });
						} else {
							// check  that email exists or not
							const checkEmailAdmin = await adminModel.findOne({ email });
							const checkEmailAdvisor = await advisorModel.findOne({ email });
							const checkEmailStudent = await studentModel.findOne({ email });

							if (checkEmailAdmin || checkEmailAdvisor || checkEmailStudent) {
								res.status(400).json({ message: "That email already used" });
							} else {
								// for check advisor range already exists or not
								const getAllAdvisor = await advisorModel.find({ department });

								const checkRange = getAllAdvisor.filter(
									(value) => min >= value.minRange && max <= value.maxRange
								);

								if (checkRange.length > 0) {
									res.status(400).json({ message: "That range already given" });
								} else {
									const document = await advisorModel({
										name,
										id,
										email,
										gender,
										password: hashPassword,
										role,
										department,
										minRange: min,
										maxRange: max,
										year
									});

									await document.save();

									res
										.status(200)
										.json({ message: "New advisor add successfully" });
								}
							}
						}
					}
				} else if (role === "student") {
					if (!(department && semester && year)) {
						res.status(400).json({ message: "Fill-up all fields!" });
					} else {
						// check that id exists or not
						const checkIdAdmin = await adminModel.findOne({ id });
						const checkIdAdvisor = await advisorModel.findOne({ id });
						const checkIdStudent = await studentModel.findOne({ id });

						if (checkIdAdmin || checkIdAdvisor || checkIdStudent) {
							res.status(400).json({ message: "That Id already used" });
						} else {
							// check that email exists or not
							const checkEmailAdmin = await adminModel.findOne({ email });
							const checkEmailAdvisor = await advisorModel.findOne({ email });
							const checkEmailStudent = await studentModel.findOne({ email });

							if (checkEmailAdmin || checkEmailAdvisor || checkEmailStudent) {
								res.status(400).json({ message: "That email already used" });
							} else {
								// find my advisor
								const allAdvisor = await advisorModel.find({ department });

								const myAdvisor = await allAdvisor.filter(
									(value) => id >= value.minRange && id <= value.maxRange
								);

								if (myAdvisor.length > 0) {
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
										advisor: myAdvisor[0]._id
									});

									await document.save();
								} else {
									throw Error("Haven't any advisor in that range!");
								}

								res
									.status(200)
									.json({ message: "New Student add successfully" });
							}
						}
					}
				}
			}
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	} else {
		res.status(400).json({ message: "Fill-up all fields!" });
	}
};

module.exports = { createNewUser };
