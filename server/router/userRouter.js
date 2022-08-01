// external modules
const express = require("express");

// sub-router
const user = express.Router();

// internal modules
const authUser = require("../middleware/authUser");

user.get("/", authUser, (req, res) => {
	res.status(200).json(req.userDocument);
});

module.exports = user;
