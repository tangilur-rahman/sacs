// external modules
const mongoose = require("mongoose");
const validator = require("validator");

const schema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			minLength: [3, "Input valid name"]
		},

		id: {
			type: String,
			required: true
		},

		email: {
			type: String,
			required: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error("Invalid Email");
				}
			}
		},

		password: {
			type: String,
			required: true,
			minLength: [8, "Minimum 8 length required"],
			trim: true
		},

		profile_img: {
			type: String,
			default: "default-img.png",
			trim: true
		},

		role: {
			type: String,
			required: true,
			trim: true
		},

		gender: {
			type: String,
			trim: true
		},

		group_room: [
			{
				room: String
			}
		],

		advisor_room: [
			{
				room: String
			}
		],

		token: {
			type: String,
			default: ""
		}
	},
	{ timestamps: true }
);

const adminModel = mongoose.model("administrator", schema);

module.exports = adminModel;
