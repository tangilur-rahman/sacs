// external modules
const express = require("express");

// create sub-router
const appointment = express.Router();

// internal modules
const authUser = require("../middleware/authUser");
const {
	submitAppointment,
	getAllAppointments
} = require("./../controllers/appController");
const { multerForAttachment } = require("./../Config/multerManager");
const appModel = require("../models/appointmentModel");

appointment.get("/", authUser, getAllAppointments);

// for get multer
const upload = multerForAttachment("files");

appointment.post("/", authUser, upload.array("files", 5), submitAppointment);

// for send specific appointment
appointment.get("/:appDisplay", authUser, async (req, res) => {
	try {
		const specificApp = await appModel.findOne({
			_id: req.params.appDisplay
		});

		res.status(200).json(specificApp);
	} catch (error) {
		res.status(500).json({ error: "Server-side error, Try again!" });
	}
});

module.exports = appointment;
