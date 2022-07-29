// external modules
const express = require("express");

// internal modules
const authUser = require("./../middleware/authUser");

const dashboard = express.Router();

dashboard.get("/", authUser, (req, res) => {
	res.status(200).json(req.userDocument);
});

module.exports = dashboard;
