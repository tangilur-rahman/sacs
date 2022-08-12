// external modules
const mongoose = require("mongoose");

const schema = mongoose.Schema(
	{
		chat_name: {
			type: String,
			trim: true
		},

		chat_img: {
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

		room: {
			type: String,
			trim: true
		}
	},
	{
		timestamps: true
	}
);

const groupModel = mongoose.model("group-chat", schema);

module.exports = groupModel;
