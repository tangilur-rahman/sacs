// external modules

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

module.exports = {
	currentUser,
	getAllAdvisors,
	getAllStudents,
	getSpecificUser
};
