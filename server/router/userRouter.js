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
	updateStudent,
	advisorProfileImg,
	studentProfileImg,
	deleteAdvisor,
	deleteStudent,
	searchAdvisors,
	searchStudents,
	getTotalStudents
} = require("./../controllers/userController");
const { multerForImg } = require("../Config/multerManager");

user.get("/", authUser, currentUser);

// for get total students when advisor
user.get("/total-students/:_id", getTotalStudents);

// for get all advisors when admin
user.get("/advisor-list", authUser, getAllAdvisors);

// for get all students when admin
user.get("/student-list", authUser, getAllStudents);

user.get("/specific-user/:_id", authUser, getSpecificUser);

// for update advisor by admin
user.put("/advisor-update", authUser, updateAdvisor);

// for update student by admin
user.put("/student-update", authUser, updateStudent);

// for upload profile-img in local-storage
const upload = multerForImg("file");

// for change advisor profile-img by admin
user.put(
	"/advisor/profile-img",
	authUser,
	upload.single("file"),
	advisorProfileImg
);

// for change student profile-img by admin
user.put(
	"/student/profile-img",
	authUser,
	upload.single("file"),
	studentProfileImg
);

// for delete advisor by admin
user.get("/advisor/delete/:_id", authUser, deleteAdvisor);

// for delete student by admin
user.get("/student/delete/:_id", authUser, deleteStudent);

// for search advisors by admin
user.get("/advisor/search/:search", authUser, searchAdvisors);

// for search students by admin
user.get("/student/search/:search", authUser, searchStudents);

module.exports = user;
