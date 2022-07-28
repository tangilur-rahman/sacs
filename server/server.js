// external modules
const express = require("express");
const cookie = require("cookie-parser");
require("dotenv").config();

// express server
const app = express();

// connection with mongodb
require("./Config/ConnectMongoDB");

// internal modules
const registerRouter = require("./router/registerRouter");
const loginRouter = require("./router/loginRouter");
const customErrorHandler = require("./middleware/errorHandler");

// application-level middleware
app.use(express.json());
app.use(cookie());

// router
app.use("/register", registerRouter);
app.use("/login", loginRouter);

// error handler
app.use(customErrorHandler);

// listening port
const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
