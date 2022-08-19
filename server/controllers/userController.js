// external modules
const bcrypt = require("bcrypt");

// internal modules
const advisorModel = require("./../models/advisorModel");
const studentModel = require("./../models/studentModel");

// get currentUser
const currentUser = (req, res) => {
	try {
		res.status(200).json(req.currentUser);
	} catch (error) {
		res.status(500).json({ error: "Invalid User!" });
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
		const student = await studentModel.findOne({ _id: req.params._id });

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
			getName,
			getId,
			getDepart,
			getEmail,
			getGender,
			getRole,
			getYear,
			getSemester,
			newPassword
		} = req.body.userDocument;

		console.log(req.body.userDocument);

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

		if (getSemester) {
			await advisorModel.updateOne(
				{ _id },
				{ $set: { semester: getSemester } }
			);
		}

		if (getYear) {
			await advisorModel.updateOne({ _id }, { $set: { year: getYear } });
		}

		if (getRole) {
			await advisorModel.updateOne({ _id }, { $set: { role: getRole } });
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
	console.log(req.body.userDocument);

	try {
		const {
			_id,
			getName,
			getId,
			getDepart,
			getEmail,
			getGender,
			getRole,
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

		if (getRole) {
			await studentModel.updateOne({ _id }, { $set: { role: getRole } });
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

module.exports = {
	currentUser,
	getAllAdvisors,
	getAllStudents,
	getSpecificUser,
	updateAdvisor,
	updateStudent,
	advisorProfileImg,
	studentProfileImg
};
