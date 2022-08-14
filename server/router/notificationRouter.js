// external modules
const express = require("express");

// sub-router
const notification = express.Router();

// internal modules
const authUser = require("../middleware/authUser");
const {
	getNotifications,
	createNotification,
	makeAllRead
} = require("../controllers/notificationController");

// for send all notifications
notification.get("/", authUser, getNotifications);

// for create or update notifications
notification.put("/", authUser, createNotification);

// for make read notification
notification.get("/read", authUser, makeAllRead);

module.exports = notification;
