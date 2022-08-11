// external modules

// internal modules
const personalModel = require("../models/personalChatModel");
const studentModel = require("./../models/studentModel");
const advisorModel = require("./../models/advisorModel");

// create or get personal-chat
const createOrGet = async (req, res) => {
	try {
		const { student_id, advisor_id } = req.body;

		// check personal-chat exist or not
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

module.exports = { createOrGet, submitMessage };
