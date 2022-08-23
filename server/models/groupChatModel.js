// external modules
const mongoose = require("mongoose");

const schema = mongoose.Schema(
	{
		room: {
			type: mongoose.Types.ObjectId,
			trim: true
		},

		group_name: {
			type: String,
			trim: true
		},

		group_img: {
			type: String,
			default: "group-default.png"
		},

		messages: [
			{
				id: String,
				name: {
					type: String,
					trim: true
				},
				profile_img: String,
				message: {
					type: String,
					trim: true
				},
				time: Date
			}
		],

		attachments: [
			{
				id: String,
				name: {
					type: String,
					trim: true
				},
				profile_img: String,

				attachment: String,
				message: {
					type: String,
					trim: true
				},
				time: Date
			}
		]
	},
	{
		timestamps: true
	}
);

const groupModel = mongoose.model("group-chat", schema);

module.exports = groupModel;
