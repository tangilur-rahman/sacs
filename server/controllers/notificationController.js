// external modules

// internal modules
const notificationModel = require("./../models/notificationModel");

const getNotifications = async (req, res) => {
	try {
		if (req.currentUser.role === "administrator") {
			const notifications = await notificationModel.findOne({
				id: "administrator"
			});

			res.status(200).json(notifications);
		} else if (req.currentUser.role === "advisor") {
			const notifications = await notificationModel.findOne({
				id: req.currentUser._id
			});

			const notificationsGroup = await notificationModel.findOne({
				id: `advisor-${req.currentUser._id}`
			});

			if (notifications || notificationsGroup) {
				const notificationArray = notifications.notification.concat(
					notificationsGroup.notification
				);

				res.status(200).json(notificationArray);
			}
		} else if (req.currentUser.role === "student") {
			const notifications = await notificationModel.findOne({
				id: req.currentUser._id
			});

			const notificationsGroup = await notificationModel.findOne({
				id: `student-${req.currentUser.advisor._id}`
			});

			if (notifications || notificationsGroup) {
				const notificationArray = notifications.notification.concat(
					notificationsGroup.notification
				);

				res.status(200).json(notificationArray);
			}
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const createNotification = async (req, res) => {
	const {
		id,
		sender_name,
		sender_profile,
		kind,
		text,
		last_message,
		time,
		from_where
	} = req.body;

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
				time,
				from_where
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
};

const makeAllRead = async (req, res) => {
	try {
		if (req.currentUser.role === "administrator") {
			const document = await notificationModel.findOne({
				id: "administrator"
			});
			document.notification.map((value) => (value.isRead = true));

			document.save();
			res.status(200).json({ message: "successfully update" });
		} else if (req.currentUser.role === "advisor") {
			const document = await notificationModel.findOne({
				id: req.currentUser._id
			});
			document.notification.map((value) => (value.isRead = true));

			const groupNotification = await notificationModel.findOne({
				id: `advisor-${req.currentUser._id}`
			});
			groupNotification.notification.map((value) => (value.isRead = true));

			document.save();
			groupNotification.save();
			res.status(200).json({ message: "successfully update" });
		} else if (req.currentUser.role === "student") {
			const document = await notificationModel.findOne({
				id: req.currentUser._id
			});
			document.notification.map((value) => (value.isRead = true));

			const groupNotification = await notificationModel.findOne({
				id: `student-${req.currentUser.advisor._id}`
			});
			groupNotification.notification.map((value) => (value.isRead = true));

			document.save();
			groupNotification.save();
			res.status(200).json({ message: "successfully update" });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = { getNotifications, createNotification, makeAllRead };
