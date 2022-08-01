// external modules
const express = require("express");

// sub-router
const login = express.Router();

// internal modules
const loginController = require("./../controllers/loginController");

login.post("/", loginController);

module.exports = login;
