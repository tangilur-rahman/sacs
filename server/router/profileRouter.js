// external modules
const express = require("express");

// sub-router
const profile = express.Router();

// internal modules
const authUser = require("../middleware/authUser");
const { updatePassword } = require("./../controllers/profileController");

profile.put("/update", authUser, updatePassword);

module.exports = profile;
