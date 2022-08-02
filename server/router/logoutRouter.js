// external modules
const express = require("express");

// sub-router
const logout = express.Router();

// internal modules
const authUser = require("./../middleware/authUser");

logout.get("/", authUser, async (req, res) => {
	try {
		await res.clearCookie("sacsCookie");

		res.status(200).json({ message: "Logout Successfully" });
	} catch (error) {
		console.log(error.message);

		res.status(500).json({ error: "Something Was Wrong,Try Later" });
	}
});

module.exports = logout;
