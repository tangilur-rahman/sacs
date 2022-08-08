// external modules
const express = require("express");

// sub-router
const group_chat = express.Router();

// internal modules
const { createOrGet } = require("./../controllers/groupController");

group_chat.post("/", createOrGet);

module.exports = group_chat;
