// external modules
const express = require("express");

// sub-router
const user = express.Router();

// internal modules
const authUser = require("../middleware/authUser");
const advisorModel = require("./../models/advisorModel");
const studentModel = require("./../models/studentModel");

user.get("/", authUser, (req, res) => {
	try {
		res.status(200).json(req.currentUser);
	} catch (error) {
		res.status(500).json({ error: "Invalid User!" });
	}
});

// for get all advisors
user.get("/advisor-list", async (req, res) => {
	try {
		const advisorDocs = await advisorModel.find({});

		res.status(200).json(advisorDocs);
	} catch (error) {
		res.status(500).json({ error: "Something was wrong, Try again!" });
	}
});

// for get all students
user.get("/student-list", async (req, res) => {
	try {
		const studentDocs = await studentModel.find({});

		res.status(200).json(studentDocs);
	} catch (error) {
		res.status(500).json({ error: "Something was wrong, Try again!" });
	}
});

module.exports = user;
