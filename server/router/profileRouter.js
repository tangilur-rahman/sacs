// external modules
const express = require("express");
const path = require("path");

// sub-router
const profile = express.Router();

// internal modules
const authUser = require("../middleware/authUser");
const {
	updateInfo,
	changeProfileImg
} = require("./../controllers/profileController");
const { multerForImg } = require("../Config/multerManager");

profile.put("/update", authUser, updateInfo);

const upload = multerForImg("file");
profile.put("/upload", authUser, upload.single("file"), changeProfileImg);

module.exports = profile;
