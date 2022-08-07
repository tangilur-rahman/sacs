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

		subject: {
			type: String,
			required: true
		},

		category: {
			type: String,
			required: true
		},

		description: {
			type: String,
			required: true
		},

		appointment_date: Date,

		attachments: [
			{
				type: String
			}
		],

		reply: [
			{
				id: Number,
				profile_img: String,
				comment: String,
				date: Date
			}
		],

		status: {
			type: String,
			default: "pending"
		}
	},
	{ timestamps: true }
);

const appModel = mongoose.model("appointment", schema);

module.exports = appModel;
