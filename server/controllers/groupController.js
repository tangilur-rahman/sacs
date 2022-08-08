// external modules

// internal modules
const groupModel = require("../models/groupChatModel");

// create or get group-chat
const createOrGet = async (req, res) => {
	try {
		const { department, semester, year } = req.body;

		// check group exist or not
		const getGroup = await groupModel.findOne({
			room: `${department}-${semester}-${year}`
		});

		if (getGroup) {
			res.status(200).json(getGroup);
		} else {
			// create that group
			const createGroup = await groupModel({
				chat_name: department,
				room: `${department}-${semester}-${year}`
			});

			await createGroup.save();

			res.status(200).json(createGroup);
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

module.exports = { createOrGet, submitMessage };
