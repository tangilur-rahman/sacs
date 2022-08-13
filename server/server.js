// external modules
const express = require("express");
const cookie = require("cookie-parser");
require("dotenv").config();

// internal modules
const customErrorHandler = require("./middleware/errorHandler");
const registerRouter = require("./router/registerRouter");
const userRouter = require("./router/userRouter");
const instructorRouter = require("./router/instructorListRouter");
const studentRouter = require("./router/studentListRouter");
const loginRouter = require("./router/loginRouter");
const logoutRouter = require("./router/logoutRouter");
const profileRouter = require("./router/profileRouter");
const myAdvisorRouter = require("./router/myAdvisorRouter");
const appointmentRouter = require("./router/appointmentRouter");
const groupChatRouter = require("./router/groupChatRouter");
const personalChatRouter = require("./router/personalChatRouter");

// express server
const app = express();

// connection with mongodb
require("./Config/ConnectMongoDB");

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
app.use("/profile", profileRouter);
app.use("/my-advisor", myAdvisorRouter);
app.use("/appointment", appointmentRouter);
app.use("/group-chat", groupChatRouter);
app.use("/personal-chat", personalChatRouter);

// error handler
app.use(customErrorHandler);

// socket section start
const http = require("http");
const httpServer = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:3000"
	}
});

io.on("connection", (socket) => {
	// for messages start
	socket.on("join_room", (data) => {
		socket.join(data);
	});

	// for receive & send messages
	socket.on("send_message", ({ messageObject, room }) => {
		io.to(room).emit("receive_message", messageObject);
	});
	// for messages end

	// for create-notification start
	socket.on("join_room_appointment", (data) => {
		socket.join(data);
	});

	socket.on("send_appointment", ({ objectData, room }) => {
		io.to(room).emit("receive_appointment", objectData);
	});
	// for create-notification end
});
// socket section end

// listening port
const port = process.env.PORT || 4000;

httpServer.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
