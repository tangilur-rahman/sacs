// external modules
const express = require("express");

// create sub-router
const appointment = express.Router();

// internal modules
const authUser = require("../middleware/authUser");
const { submitAppointment } = require("./../controllers/appController");
const { multerForAttachment } = require("./../Config/multerManager");

const upload = multerForAttachment("files");

appointment.post("/", authUser, upload.array("files", 5), submitAppointment);

module.exports = appointment;
