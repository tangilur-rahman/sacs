// external modules

// internal modules
const adminModel = require("../models/administratorModel");
const groupModel = require("../models/groupChatModel");
const studentModel = require("../models/studentModel");

// create or get group-chat
const createOrGet = async (req, res) => {
	try {
		if (req.currentUser.role === "administrator") {
			const findGroups = await groupModel.find({});
			res.status(200).json(findGroups);
		} else if (req.currentUser.role === "advisor") {
			const findGroup = await groupModel.findOne({ room: req.currentUser._id });

			if (findGroup) {
				res.status(200).json(findGroup);
			} else {
				// create that group
				const createGroup = await groupModel({
					group_name:
						"Department Of" + " " + req.currentUser.department.toUpperCase(),
					room: req.currentUser._id
				});

				const document = await adminModel.findOne({ role: "administrator" });

				document.group_room.push({
					room: req.currentUser._id
				});

				await document.save();

				await createGroup.save();

				res.status(200).json(createGroup);
			}
		} else if (req.currentUser.role === "student") {
			const findGroup = await groupModel.findOne({
				room: req.currentUser.advisor._id
			});

			if (findGroup) {
				res.status(200).json(findGroup);
			} else {
				// create that group
				const createGroup = await groupModel({
					group_name:
						"Department Of" + " " + req.currentUser.department.toUpperCase(),
					room: req.currentUser.advisor._id
				});
				const document = await adminModel.findOne({ role: "administrator" });

				document.group_room.push({
					room: req.currentUser.advisor._id
				});

				await document.save();

				await createGroup.save();

				res.status(200).json(createGroup);
			}
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// for submit message
const submitMessage = async (req, res) => {
	try {
		const { _id, message } = req.body;

		const groupDoc = await groupModel.findOne({ _id });

		groupDoc.messages.push({
			id: req.currentUser.id,
			name: req.currentUser.name,
			profile_img: req.currentUser.profile_img,
			message,
			time: Date.now()
		});

		await groupDoc.save();
		res.status(200).json({ message: "Submitted Successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// for submit file
const submitFile = async (req, res) => {
	try {
		const { _id, message } = req.body;

		const groupDoc = await groupModel.findOne({ _id });

		groupDoc.attachments.push({
			id: req.currentUser.id,
			name: req.currentUser.name,
			profile_img: req.currentUser.profile_img,
			attachment: req.file.filename,
			message,
			time: Date.now()
		});

		await groupDoc.save();
		res.status(200).json({ message: "Submitted Successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// for change group-img & group-name
const changeGroupInfo = async (req, res) => {
	try {
		const { _id, group_name } = req.body;

		if (group_name) {
			await groupModel.updateOne(
				{ _id },
				{
					$set: { group_name }
				}
			);
		}

		if (req.file?.filename) {
			await groupModel.updateOne(
				{ _id },
				{
					$set: { group_img: req.file.filename }
				}
			);
		}

		res.status(200).json({ message: "Group Update successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const allGroupMembers = async (req, res) => {
	try {
		const getAllMembers = await studentModel.find({
			advisor: req.params._id
		});

		res.status(200).json(getAllMembers);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// for search document which come from notification
const searchDocument = async (req, res) => {
	try {
		const document = await groupModel
			.findOne({ _id: req.params._id })
			.populate("student", "name profile_img")
			.populate("advisor", "name profile_img");

		res.status(200).json(document);
	} catch (error) {
		res.status(500).json({ error: "Not Found Students" });
	}
};

module.exports = {
	createOrGet,
	submitMessage,
	submitFile,
	changeGroupInfo,
	allGroupMembers,
	searchDocument
};
