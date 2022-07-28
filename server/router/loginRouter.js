// external modules
const express = require("express");

// internal modules
const loginController = require("./../controllers/loginController");

// sub-router
const login = express.Router();

login.post("/", loginController);

module.exports = login;
