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

		if (document) {
			res.status(200).json(document);
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// for update notifications
notification.put("/", authUser, async (req, res) => {
	const { id, sender_name, sender_profile, kind, text, last_message, time } =
		req.body;
	try {
		const document = await notificationModel.findOne({
			id: id
		});

		if (document) {
			document.notification.push({
				sender_name,
				sender_profile,
				kind,
				text,
				last_message,
				time
			});

			await document.save();
			res.status(200).json({ message: "notification update successfully" });
		} else {
			const createDocument = await notificationModel({
				id
			});
			createDocument.notification.push({
				sender_name,
				sender_profile,
				kind,
				text,
				last_message,
				time
			});

			await createDocument.save();
			res.status(200).json({ message: "notification update successfully" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = notification;
