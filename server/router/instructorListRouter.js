// external modules
const express = require("express");

// internal modules
const authUser = require("./../middleware/authUser");
const userModel = require("./../models/userModel");

const instructor = express.Router();

instructor.get("/", authUser, async (req, res) => {
	try {
		const documents = await userModel.find({ role: "Instructor" });
		res.status(200).json(documents);
	} catch (error) {
		res.send(500).json({ error: "Something was Wrong, Try Later!" });
	}
});

module.exports = instructor;
