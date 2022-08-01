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
			type: Number,
			required: true,
			unique: true
		},

		email: {
			type: String,
			required: true,
			unique: true,
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

		department: {
			type: String,
			trim: true
		},

		group: {
			type: String,
			trim: true
		},
		semester: {
			type: String,
			trim: true
		},
		year: {
			type: String,
			trim: true
		},
		tokens: [
			{
				token: {
					type: String,
					unique: true,
					required: true
				}
			}
		]
	},
	{ timestamps: true }
);

const userModel = mongoose.model("user", schema);

module.exports = userModel;
