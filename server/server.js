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
const loginRouter = require("./router/loginRouter");
const dashboardRouter = require("./router/dashboardRouter");
const instructorRouter = require("./router/instructorListRouter");
const studentRouter = require("./router/studentListRouter");

// application-level middleware
app.use(express.json());
app.use(cookie());

// router
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/dashboard", dashboardRouter);
app.use("/instructor-list", instructorRouter);
app.use("/student-list", studentRouter);

// error handler
app.use(customErrorHandler);

// listening port
const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
