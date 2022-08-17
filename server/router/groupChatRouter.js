// external modules
const express = require("express");

// sub-router
const group_chat = express.Router();

// internal modules
const {
	createOrGet,
	submitMessage,
	submitFile,
	changeGroupInfo
} = require("./../controllers/groupController");

const authUser = require("./../middleware/authUser");

const {
	multerForImg,
	multerForAttachment
} = require("./../Config/multerManager");

// for create or get group-chat
group_chat.post("/", authUser, createOrGet);

// for update group messages
group_chat.put("/", authUser, submitMessage);

// for submit attachment-file
// for get multer
const upload = multerForAttachment("file");
group_chat.put("/file", authUser, upload.single("file"), submitFile);

// for update group-img or group-name
const uploadImg = multerForImg("file");
group_chat.put("/update", authUser, uploadImg.single("file"), changeGroupInfo);

module.exports = group_chat;
