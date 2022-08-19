// internal modules
const advisorModel = require("../models/advisorModel");
const appModel = require("../models/appointmentModel");

// create appointment
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

			// for add attachments start
			const filename = req.files.map((value) => value.filename);

			document.attachments = [].concat(filename);
			// for add attachments end

			await document.save();

			res.status(200).json({ message: "Appointment submit successfully" });
		} else {
			res.status(400).json({ message: "Fill-up all fields!" });
		}
	} catch (error) {
		res.status(500).json({ error: "Server-side error, Try again!" });
	}
};

// get all appointment
const getAllAppointments = async (req, res) => {
	try {
		if (req.currentUser.role === "administrator") {
			const appDocuments = await appModel.find({});

			res.status(200).json(appDocuments);
		} else {
			const appDocuments = await appModel
				.find({
					$or: [
						{ student: req.currentUser._id },
						{ advisor: req.currentUser._id }
					]
				})
				.populate("student", "name profile_img");

			res.status(200).json(appDocuments);
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// get specific document
const getSpecificApp = async (req, res) => {
	try {
		const specificApp = await appModel
			.findOne({
				_id: req.params.appDisplay
			})
			.populate("student", "_id name id profile_img")
			.populate("advisor", "_id name id profile_img");

		res.status(200).json(specificApp);
	} catch (error) {
		res.status(500).json({ error: "Server-side error, Try again!" });
	}
};

// submit reply
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

		if (replyText) {
			appDoc.reply.push({
				id: req.currentUser.id,
				profile_img: req.currentUser.profile_img,
				comment: replyText,
				date: Date.now()
			});

			await appDoc.save();
			res.status(200).json({ message: "Submitted Successfully" });
		} else {
			res.status(200).json({ message: "Submitted Successfully" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// for update isRead
const isRead = async (req, res) => {
	try {
		await appModel.updateOne(
			{ _id: req.body._id },
			{
				$set: { isRead: true }
			}
		);

		res.status(200).json({ message: "update successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// delete a appointment
const deleteAppointment = async (req, res) => {
	try {
		await appModel.deleteOne({ _id: req.params._id });

		res.status(200).json({ message: "Appointment deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	submitAppointment,
	getAllAppointments,
	getSpecificApp,
	replyUpdate,
	isRead,
	deleteAppointment
};
