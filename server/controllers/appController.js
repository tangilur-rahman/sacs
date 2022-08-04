// internal modules
const appModel = require("../models/appointmentModel");

const submitAppointment = async (req, res) => {
	try {
		const { subject, category, description } = req.body;

		if (subject && category && description) {
			const document = await appModel({
				student: req.currentUser._id,
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
		const appDocuments = await appModel.find({ student: req.currentUser._id });

		res.status(200).json(appDocuments);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = { submitAppointment, getAllAppointments };
