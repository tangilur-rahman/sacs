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
				room: `${department}-${semester}-${year}`
			});

			await createGroup.save();

			res.status(200).json(createGroup);
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = { createOrGet };
