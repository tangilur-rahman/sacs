// external modules
const express = require("express");

// create sub-router
const appointment = express.Router();

// internal modules
const authUser = require("../middleware/authUser");
const {
	submitAppointment,
	getAllAppointments,
	getSpecificApp,
	replyUpdate
} = require("./../controllers/appController");
const { multerForAttachment } = require("./../Config/multerManager");

appointment.get("/", authUser, getAllAppointments);

// for get multer
const upload = multerForAttachment("files");

appointment.post("/", authUser, upload.array("files", 5), submitAppointment);

// for send specific appointment
appointment.get("/:appDisplay", authUser, getSpecificApp);

// for update reply
appointment.put("/update", authUser, replyUpdate);

module.exports = appointment;
