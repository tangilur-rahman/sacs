// external modules
const express = require("express");
const cookie = require("cookie-parser");
require("dotenv").config();

// express server
const app = express();

// connection with mongodb
require("./Config/ConnectMongoDB");

// internal modules
const customErrorHandler = require("./middleware/errorHandler");
const registerRouter = require("./router/registerRouter");
const userRouter = require("./router/userRouter");
const instructorRouter = require("./router/instructorListRouter");
const studentRouter = require("./router/studentListRouter");
const loginRouter = require("./router/loginRouter");
const logoutRouter = require("./router/logoutRouter");

// application-level middleware
app.use(express.json());
app.use(cookie());

// router
app.use("/user", userRouter);
app.use("/register", registerRouter);
app.use("/instructor-list", instructorRouter);
app.use("/student-list", studentRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);

// error handler
app.use(customErrorHandler);

// listening port
const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
