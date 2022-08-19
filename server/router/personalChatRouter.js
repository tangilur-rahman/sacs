// external modules
const express = require("express");

// sub-router
const personal_chat = express.Router();

// internal modules
const {
	createOrGet,
	submitMessage,
	getAllStudents,
	searchStudents,
	searchDocument,
	submitFile
} = require("./../controllers/personalController");
const authUser = require("./../middleware/authUser");
const { multerForAttachment } = require("./../Config/multerManager");

// for advisor get his/her all students
personal_chat.get("/", authUser, getAllStudents);

// for get search result
personal_chat.get("/:search", authUser, searchStudents);

// for get search result from notification
personal_chat.get("/notification/:_id", authUser, searchDocument);

// for create or get personal-chat
personal_chat.post("/", authUser, createOrGet);

// for update personal messages
personal_chat.put("/", authUser, submitMessage);

// for submit attachment-file
// for get multer
const upload = multerForAttachment("file");

personal_chat.put("/file", authUser, upload.single("file"), submitFile);

module.exports = personal_chat;
