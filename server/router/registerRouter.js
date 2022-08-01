// external modules
const express = require("express");

// sub-router
const register = express.Router();

// internal modules
const { createNewUser } = require("../controllers/regController");

register.post("/", createNewUser);

module.exports = register;
