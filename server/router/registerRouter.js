// external modules
const express = require("express");

// internal modules
const { createNewUser } = require("../controllers/regController");

const register = express.Router();

register.post("/", createNewUser);

module.exports = register;
