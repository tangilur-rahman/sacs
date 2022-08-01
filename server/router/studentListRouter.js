// external modules
const express = require("express");

// sub-router
const student = express.Router();

// internal modules
const authUser = require("./../middleware/authUser");
const userModel = require("./../models/userModel");

student.get("/", authUser, async (req, res) => {
	try {
		const documents = await userModel.find({ role: "Student" });
		res.status(200).json(documents);
	} catch (error) {
		res.send(500).json({ error: "Something was Wrong, Try Later!" });
	}
});

module.exports = student;
