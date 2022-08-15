// external modules
const express = require("express");
const personalModel = require("../models/personalChatModel");
const studentModel = require("../models/studentModel");

// sub-router
const personal_chat = express.Router();

// internal modules
const {
	createOrGet,
	submitMessage,
	getAllStudents,
	searchStudents
} = require("./../controllers/personalController");
const authUser = require("./../middleware/authUser");

// for advisor get his/her all students
personal_chat.get("/", authUser, getAllStudents);

// for get search result
personal_chat.get("/:search", authUser, searchStudents);

// for create or get personal-chat
personal_chat.post("/", authUser, createOrGet);

// for update personal messages
personal_chat.put("/", authUser, submitMessage);

module.exports = personal_chat;
