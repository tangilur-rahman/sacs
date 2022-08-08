// external modules
const express = require("express");
const groupModel = require("../models/groupChatModel");

// sub-router
const group_chat = express.Router();

// internal modules
const {
	createOrGet,
	submitMessage
} = require("./../controllers/groupController");
const authUser = require("./../middleware/authUser");

// for create or get group-chat
group_chat.post("/", authUser, createOrGet);

// for update group messages
group_chat.put("/", authUser, submitMessage);

module.exports = group_chat;
