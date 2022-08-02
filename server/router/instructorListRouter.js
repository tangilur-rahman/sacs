// external modules
const express = require("express");

// sub-router
const instructor = express.Router();

// internal modules
const authUser = require("./../middleware/authUser");
const adminModel = require("./../models/administratorModel");

instructor.get("/", authUser, async (req, res) => {
	try {
		const documents = await adminModel.find({ role: "Instructor" });
		res.status(200).json(documents);
	} catch (error) {
		res.send(500).json({ error: "Something was Wrong, Try Later!" });
	}
});

module.exports = instructor;
