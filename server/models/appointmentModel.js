// external modules
const mongoose = require("mongoose");

const schema = mongoose.Schema(
	{
		student_id: {
			type: mongoose.Types.ObjectId,
			ref: "student"
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

		attachments: [
			{
				type: String
			}
		],

		reply: [
			{
				type: String
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
