// external modules
const express = require("express");

// sub-router
const notification = express.Router();

// internal modules
const authUser = require("../middleware/authUser");
const notificationModel = require("../models/notificationModel");

// for send all notifications
notification.get("/", authUser, async (req, res) => {
	try {
		const document = await notificationModel.findOne({
			id: req.currentUser._id
		});

		res.status(200).json(document?.notification);
	} catch (error) {
		console.log(error.message);

		res.status(500).json(error.error);
	}
});

// for update notifications
notification.put("/", authUser, async (req, res) => {});

module.exports = notification;
