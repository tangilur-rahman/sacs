// external modules
const bcrypt = require("bcrypt");

// internal modules
const adminModel = require("./../models/administratorModel");

const updatePassword = async (req, res) => {
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
		} else {
			const hashPassword = await bcrypt.hash(newPassword, 10);

			await userModel.adminModel(
				{ _id: req.userDocument._id },
				{
					$set: { password: hashPassword }
				}
			);

			res.status(200).json({ message: "Password updated successfully" });
		}
	} catch (error) {
		res.status(500).json({ message: "Something was Wrong, Try again!" });
	}
};

const changeProfileImg = async (req, res) => {
	try {
		await adminModel.updateOne(
			{ _id: req.userDocument._id },
			{
				$set: { profile_img: req.file.filename }
			}
		);
		res.status(200).json({ message: "Profile image update successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { updatePassword, changeProfileImg };
