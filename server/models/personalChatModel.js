// external modules
const mongoose = require("mongoose");

const schema = mongoose.Schema(
	{
		student: {
			type: mongoose.Types.ObjectId,
			ref: "student"
		},

		advisor: {
			type: mongoose.Types.ObjectId,
			ref: "advisor"
		},

		messages: [
			{
				id: Number,
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

const personalModel = mongoose.model("personal-chat", schema);

module.exports = personalModel;
