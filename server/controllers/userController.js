// external modules
const bcrypt = require("bcrypt");

// internal modules
const advisorModel = require("./../models/advisorModel");
const studentModel = require("./../models/studentModel");

// get currentUser
const currentUser = async (req, res) => {
	try {
		if (req.currentUser.role === "administrator") {
			res.status(200).json(req.currentUser);
		} else if (req.currentUser.role === "advisor") {
			res.status(200).json(req.currentUser);
		} else if (req.currentUser.role === "student") {
			const currentUser = await studentModel
				.findOne({ _id: req.currentUser._id })
				.populate("advisor", "id name profile_img");
			res.status(200).json(currentUser);
		}
	} catch (error) {
		res.status(500).json({ error: "Invalid User!" });
	}
};

// for get total students when advisor
const getTotalStudents = async (req, res) => {
	try {
		const totalStudents = await studentModel.find({
			advisor: req.params._id
		});

		if (totalStudents) {
			res.status(200).json(totalStudents.length);
		}
	} catch (error) {
		res.status(500).json({ error: "Something was wrong, Try again!" });
	}
};

// for get all advisor when admin
const getAllAdvisors = async (req, res) => {
	try {
		const advisorDocs = await advisorModel.find({});

		res.status(200).json(advisorDocs);
	} catch (error) {
		res.status(500).json({ error: "Something was wrong, Try again!" });
	}
};

// for get all students when admin
const getAllStudents = async (req, res) => {
	try {
		const studentDocs = await studentModel.find({});

		res.status(200).json(studentDocs);
	} catch (error) {
		res.status(500).json({ error: "Something was wrong, Try again!" });
	}
};

// for get specific user when admin
const getSpecificUser = async (req, res) => {
	try {
		const student = await studentModel
			.findOne({ _id: req.params._id })
			.populate("advisor", "name department gender");

		if (student) {
			res.status(200).json(student);
		} else {
			const advisor = await advisorModel.findOne({ _id: req.params._id });
			res.status(200).json(advisor);
		}
	} catch (error) {
		res.status(500).json({ error: "Something was wrong, Try again!" });
	}
};

// for update advisor by admin
const updateAdvisor = async (req, res) => {
	try {
		const {
			_id,
			department,
			getName,
			getId,
			getDepart,
			getEmail,
			getGender,
			getMin,
			getMax,
			getPhone,
			newPassword
		} = req.body.userDocument;

		if (getName) {
			await advisorModel.updateOne({ _id }, { $set: { name: getName } });
		}

		if (getId) {
			const document = await advisorModel.findOne({ id: getId });

			if (document) {
				throw Error("That Id already used!");
			} else {
				await advisorModel.updateOne({ _id }, { $set: { id: getId } });
			}
		}

		if (getEmail) {
			const document = await advisorModel.findOne({ email: getEmail });

			if (document) {
				throw Error("That email already used!");
			} else {
				await advisorModel.updateOne({ _id }, { $set: { email: getEmail } });
			}
		}

		if (getGender) {
			await advisorModel.updateOne({ _id }, { $set: { gender: getGender } });
		}

		if (getDepart) {
			await advisorModel.updateOne(
				{ _id },
				{ $set: { department: getDepart } }
			);
		}

		if (getPhone) {
			if (getPhone.length === 11) {
				await advisorModel.updateOne({ _id }, { $set: { phone: getPhone } });
			} else {
				throw new Error("Invalid phone number!");
			}
		}

		if (getMin && getMax) {
			const getAllAdvisor = await advisorModel.find({ department });

			const checkRange = getAllAdvisor.filter(
				(value) => getMin >= value.minRange && getMax <= value.maxRange
			);

			if (checkRange.length > 0) {
				throw new Error("That range already given");
			} else {
				await advisorModel.updateOne(
					{ _id },
					{ $set: { minRange: getMin, maxRange: getMax } }
				);
			}
		}

		if (newPassword) {
			if (newPassword.length < 8) {
				res.status(400).json({ message: "Password is too short!" });
			} else {
				const hashPassword = await bcrypt.hash(newPassword, 10);

				await advisorModel.updateOne(
					{ _id },
					{ $set: { password: hashPassword } }
				);
			}
		}

		res.status(200).json({ message: "Advisor updated successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// for update student by admin
const updateStudent = async (req, res) => {
	try {
		const {
			_id,
			getName,
			getId,
			getDepart,
			getEmail,
			getGender,
			getAdvisor,
			getYear,
			getSemester,
			newPassword
		} = req.body.userDocument;

		if (getName) {
			await studentModel.updateOne({ _id }, { $set: { name: getName } });
		}

		if (getId) {
			const document = await studentModel.findOne({ id: getId });

			if (document) {
				throw Error("That Id already used!");
			} else {
				await studentModel.updateOne({ _id }, { $set: { id: getId } });
			}
		}

		if (getEmail) {
			const document = await studentModel.findOne({ email: getEmail });

			if (document) {
				throw Error("That email already used!");
			} else {
				await studentModel.updateOne({ _id }, { $set: { email: getEmail } });
			}
		}

		if (getGender) {
			await studentModel.updateOne({ _id }, { $set: { gender: getGender } });
		}

		if (getDepart) {
			await studentModel.updateOne(
				{ _id },
				{ $set: { department: getDepart } }
			);
		}

		if (getSemester) {
			await studentModel.updateOne(
				{ _id },
				{ $set: { semester: getSemester } }
			);
		}

		if (getYear) {
			await studentModel.updateOne({ _id }, { $set: { year: getYear } });
		}

		if (getAdvisor) {
			await studentModel.updateOne({ _id }, { $set: { advisor: getAdvisor } });
		}

		if (newPassword) {
			if (newPassword.length < 8) {
				throw Error("Password is too short!");
			} else {
				const hashPassword = await bcrypt.hash(newPassword, 10);
				await studentModel.updateOne(
					{ _id },
					{ $set: { password: hashPassword } }
				);
			}
		}

		res.status(200).json({ message: "Student updated successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// for change advisor profile-img by admin
const advisorProfileImg = async (req, res) => {
	try {
		await advisorModel.updateOne(
			{ _id: req.body._id },
			{
				$set: { profile_img: req.file.filename }
			}
		);
		res
			.status(200)
			.json({ message: "Advisor's profile-img updated successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// for change student profile-img by admin
const studentProfileImg = async (req, res) => {
	try {
		await studentModel.updateOne(
			{ _id: req.body._id },
			{
				$set: { profile_img: req.file.filename }
			}
		);
		res
			.status(200)
			.json({ message: "Student's profile-img updated successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// for delete advisor by admin
const deleteAdvisor = async (req, res) => {
	try {
		await advisorModel.deleteOne({ _id: req.params._id });

		res.status(200).json({ message: "Advisor deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// for delete student by admin
const deleteStudent = async (req, res) => {
	try {
		await studentModel.deleteOne({ _id: req.params._id });

		res.status(200).json({ message: "Student deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// for search advisors by admin
const searchAdvisors = async (req, res) => {
	try {
		const getAdvisors = await advisorModel.find({
			$or: [
				{
					id: {
						$regex: req.params.search,
						$options: "i"
					}
				},
				{
					email: {
						$regex: req.params.search,
						$options: "i"
					}
				},
				{
					name: {
						$regex: req.params.search,
						$options: "i"
					}
				}
			]
		});

		res.status(200).json(getAdvisors);
	} catch (error) {
		res.status(500).json({ error: "Not Found Any Advisors" });
	}
};

// for search students by admin
const searchStudents = async (req, res) => {
	try {
		const getStudents = await studentModel.find({
			$or: [
				{
					id: {
						$regex: req.params.search,
						$options: "i"
					}
				},
				{
					email: {
						$regex: req.params.search,
						$options: "i"
					}
				},
				{
					name: {
						$regex: req.params.search,
						$options: "i"
					}
				}
			]
		});

		res.status(200).json(getStudents);
	} catch (error) {
		res.status(500).json({ error: "Not Found Any Students" });
	}
};

// for get all advisors department wise for students
const getAdvisors = async (req, res) => {
	try {
		const advisorArray = await advisorModel.find({
			department: req.params.department
		});

		res.status(200).json(advisorArray);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	currentUser,
	getAllAdvisors,
	getAllStudents,
	getSpecificUser,
	updateAdvisor,
	updateStudent,
	advisorProfileImg,
	studentProfileImg,
	deleteAdvisor,
	deleteStudent,
	searchAdvisors,
	searchStudents,
	getTotalStudents,
	getAdvisors
};
