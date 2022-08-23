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

		phone: {
			type: String,
			validate(value) {
				if (value) {
					if (!validator.isMobilePhone(value, ["bn-BD"])) {
						throw new Error("Invalid phone number!");
					}
				} else {
					return;
				}
			},
			default: ""
		},

		gender: {
			type: String,
			trim: true
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

		minRange: Number,
		maxRange: Number,

		token: {
			type: String,
			default: ""
		}
	},
	{ timestamps: true }
);

const advisorModel = mongoose.model("advisor", schema);

module.exports = advisorModel;
