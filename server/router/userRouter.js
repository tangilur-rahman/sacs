// external modules
const express = require("express");

// sub-router
const user = express.Router();

// internal modules
const authUser = require("../middleware/authUser");
const {
	currentUser,
	getAllAdvisors,
	getAllStudents,
	getSpecificUser,
	updateAdvisor,
	updateStudent
} = require("./../controllers/userController");

user.get("/", authUser, currentUser);

// for get all advisors when admin
user.get("/advisor-list", authUser, getAllAdvisors);

// for get all students when admin
user.get("/student-list", authUser, getAllStudents);

user.get("/specific-user/:_id", authUser, getSpecificUser);

// for update advisor by admin
user.put("/advisor-update", authUser, updateAdvisor);

// for update student by admin
user.put("/student-update", authUser, updateStudent);

module.exports = user;
