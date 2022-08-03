// external modules
const express = require("express");

// sub-router
const logout = express.Router();

// internal modules
const authUser = require("./../middleware/authUser");

logout.get("/", authUser, async (req, res) => {
	try {
		await res.clearCookie(process.env.COOKIES_NAME);

		res.status(200).json({ message: "Logout Successfully" });
	} catch (error) {
		res.status(500).json({ error: "Something Was Wrong,Try Later" });
	}
});

module.exports = logout;
