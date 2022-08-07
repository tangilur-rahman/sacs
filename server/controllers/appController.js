// internal modules
const advisorModel = require("../models/advisorModel");
const appModel = require("../models/appointmentModel");

const submitAppointment = async (req, res) => {
	try {
		const { subject, category, description } = req.body;
		const { department, semester, year } = req.currentUser;

		const advisor = await advisorModel.findOne({ department, semester, year });

		if (subject && category && description) {
			const document = await appModel({
				student: req.currentUser._id,
				advisor: advisor._id,
				subject,
				category,
				description
			});

			const filename = req.files.map((value) => value.filename);

			document.attachments = [].concat(filename);

			await document.save();

			res.status(200).json({ message: "Appointment submit successfully" });
		} else {
			res.status(400).json({ message: "Fill-up all fields!" });
		}
	} catch (error) {
		res.status(500).json({ error: "Server-side error, Try again!" });
	}
};

const getAllAppointments = async (req, res) => {
	try {
		const appDocuments = await appModel.find({
			$or: [{ student: req.currentUser._id }, { advisor: req.currentUser._id }]
		});

		res.status(200).json(appDocuments);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getSpecificApp = async (req, res) => {
	try {
		const specificApp = await appModel
			.findOne({
				_id: req.params.appDisplay
			})
			.populate("student", "name id profile_img");

		res.status(200).json(specificApp);
	} catch (error) {
		res.status(500).json({ error: "Server-side error, Try again!" });
	}
};

const replyUpdate = async (req, res) => {
	try {
		const { _id, picDate, replyText, getStatus } = req.body;

		const appDoc = await appModel.findOne({ _id });

		await appModel.updateOne(
			{ _id },
			{
				$set: {
					appointment_date: picDate ? picDate : "",
					status: getStatus ? getStatus : "pending"
				}
			}
		);

		appDoc.reply = [].concat({
			profile_img: req.currentUser.profile_img,
			comment: replyText
		});

		await appDoc.save();

		res.status(200).json({ message: "Submitted Successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	submitAppointment,
	getAllAppointments,
	getSpecificApp,
	replyUpdate
};
