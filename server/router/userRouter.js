// external modules
const express = require("express");

// internal modules
const authUser = require("../middleware/authUser");

const user = express.Router();

user.get("/", authUser, (req, res) => {
	res.status(200).json(req.userDocument);
});

module.exports = user;
