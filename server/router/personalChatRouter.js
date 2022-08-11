// external modules
const express = require("express");

// sub-router
const personal_chat = express.Router();

// internal modules
const {
	createOrGet,
	submitMessage
} = require("./../controllers/personalController");
const authUser = require("./../middleware/authUser");

// for create or get group-chat
personal_chat.post("/", authUser, createOrGet);

// for update group messages
personal_chat.put("/", authUser, submitMessage);

module.exports = personal_chat;
