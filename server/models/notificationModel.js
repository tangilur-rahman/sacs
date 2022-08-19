// external modules
const mongoose = require("mongoose");

const schema = mongoose.Schema({
	id: String,
	notification: [
		{
			sender_name: String,
			sender_profile: String,
			kind: String,
			text: String,
			last_message: String,
			isRead: {
				type: Boolean,
				default: false
			},
			adminIsRead: {
				type: Boolean,
				default: false
			},
			time: Date,

			from_where: String
		}
	]
});

const notificationModel = mongoose.model("notification", schema);

module.exports = notificationModel;
