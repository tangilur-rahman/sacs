const express = require("express");
const authUser = require("./../middleware/authUser");

const logout = express.Router();

logout.get("/", authUser, async (req, res) => {
	try {
		await res.clearCookie("sacsCookie");

		res.status(200).json({ message: "Logout Successfully" });
	} catch (error) {
		res.status(500).json({ error: "Something Was Wrong,Try Later" });
	}
});

module.exports = logout;
