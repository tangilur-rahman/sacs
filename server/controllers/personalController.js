// external modules

// internal modules
const personalModel = require("../models/personalChatModel");
const studentModel = require("./../models/studentModel");
const advisorModel = require("./../models/advisorModel");

// when advisor & he/she want to get all students
const getAllStudents = async (req, res) => {
	try {
		const studentsDoc = await personalModel
			.find({
				advisor: req.currentUser._id
			})
			.populate("student", "name profile_img")
			.populate("advisor", "name profile_img");

		res.status(200).json(studentsDoc);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// for search students
const searchStudents = async (req, res) => {
	try {
		const getStudents = await studentModel
			.find({
				advisor: req.currentUser._id,
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
			})
			.populate("advisor", "id");

		res.status(200).json(getStudents);
	} catch (error) {
		res.status(500).json({ error: "Not Found Students" });
	}
};

// for search document which come from notification
const searchDocument = async (req, res) => {
	try {
		const document = await personalModel
			.findOne({ _id: req.params._id })
			.populate("student", "name profile_img")
			.populate("advisor", "name profile_img");

		res.status(200).json(document);
	} catch (error) {
		res.status(500).json({ error: "Not Found Any Students" });
	}
};

// create or get personal-chat
const createOrGet = async (req, res) => {
	try {
		const { student_id, advisor_id } = req.body;

		const getPersonal = await personalModel
			.findOne({
				room: `${advisor_id}-${student_id}`
			})
			.populate("student", "name profile_img")
			.populate("advisor", "name profile_img");

		if (getPersonal) {
			res.status(200).json(getPersonal);
		} else {
			// get student
			const getStudent = await studentModel.findOne({ id: student_id });

			// get advisor
			const getAdvisor = await advisorModel.findOne({ id: advisor_id });

			// create that personal-chat
			const createPersonal = await personalModel({
				student: getStudent._id,
				advisor: getAdvisor._id,
				room: `${advisor_id}-${student_id}`
			});

			await createPersonal.save();

			const findPersonal = await personalModel
				.findOne({ _id: createPersonal._id })
				.populate("student", "name profile_img")
				.populate("advisor", "name profile_img");

			res.status(200).json(findPersonal);
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// for submit message
const submitMessage = async (req, res) => {
	try {
		const { _id, message } = req.body;

		const personalDoc = await personalModel.findOne({ _id });

		personalDoc.messages.push({
			id: req.currentUser.id,
			name: req.currentUser.name,
			profile_img: req.currentUser.profile_img,
			message,
			time: Date.now()
		});

		await personalDoc.save();
		res.status(200).json({ message: "Submitted Successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// for submit file
const submitFile = async (req, res) => {
	try {
		const { _id, message } = req.body;

		const personalDoc = await personalModel.findOne({ _id });

		personalDoc.attachments.push({
			id: req.currentUser.id,
			name: req.currentUser.name,
			profile_img: req.currentUser.profile_img,
			attachment: req.file.filename,
			message,
			time: Date.now()
		});

		await personalDoc.save();
		res.status(200).json({ message: "Submitted Successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getAllStudents,
	searchStudents,
	searchDocument,
	createOrGet,
	submitMessage,
	submitFile
};
