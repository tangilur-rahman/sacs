// external modules
const express = require("express");
const bcrypt = require("bcrypt");

// internal modules
const authUser = require("../middleware/authUser");
const userModel = require("../models/userModel");

const profile = express.Router();

profile.put("/update", authUser, async (req, res) => {
	const { cpassword, newPassword } = req.body;

	try {
		if (!cpassword) {
			res.status(400).json({ message: "Fill-up current password field" });
		} else if (!newPassword) {
			res.status(400).json({ message: "Fill-up current new password field" });
		} else if (cpassword !== newPassword) {
			res.status(400).json({ message: "Password didn't match" });
		} else if (newPassword.length < 8) {
			res.status(400).json({ message: "Password must be minimum 8 length " });
		}

		const hashPassword = await bcrypt.hash(newPassword, 10);

		await userModel.updateOne(
			{ _id: req.userDocument._id },
			{
				$set: { password: hashPassword }
			}
		);

		res.status(200).json({ message: "Password update successfully" });
	} catch (error) {
		res.send(500).json({ message: "Something was Wrong, Try Later!" });
	}
});

module.exports = profile;
