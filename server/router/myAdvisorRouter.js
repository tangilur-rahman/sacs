// external modules
const express = require("express");
const studentModel = require("../models/studentModel");

// sub-router
const myAdvisor = express.Router();

// internal modules
const authUser = require("./../middleware/authUser");

myAdvisor.get("/", authUser, async (req, res) => {
	try {
		const document = await studentModel
			.findOne({ _id: req.currentUser._id })
			.populate("advisor", "name id email phone gender department profile_img");

		res.status(200).json(document.advisor);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = myAdvisor;
