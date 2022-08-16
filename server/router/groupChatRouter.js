// external modules
const express = require("express");

// sub-router
const group_chat = express.Router();

// internal modules
const {
	createOrGet,
	submitMessage,
	submitFile
} = require("./../controllers/groupController");
const authUser = require("./../middleware/authUser");
const { multerForAttachment } = require("./../Config/multerManager");

// for create or get group-chat
group_chat.post("/", authUser, createOrGet);

// for update group messages
group_chat.put("/", authUser, submitMessage);

// for submit attachment-file
// for get multer
const upload = multerForAttachment("file");
group_chat.put("/file", authUser, upload.single("file"), submitFile);

module.exports = group_chat;
