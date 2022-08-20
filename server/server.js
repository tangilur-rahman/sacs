// external modules
const express = require("express");
const cookie = require("cookie-parser");
const path = require("path");
require("dotenv").config();

// internal modules
const customErrorHandler = require("./middleware/errorHandler");
const registerRouter = require("./router/registerRouter");
const userRouter = require("./router/userRouter");
const loginRouter = require("./router/loginRouter");
const logoutRouter = require("./router/logoutRouter");
const profileRouter = require("./router/profileRouter");
const myAdvisorRouter = require("./router/myAdvisorRouter");
const appointmentRouter = require("./router/appointmentRouter");
const groupChatRouter = require("./router/groupChatRouter");
const personalChatRouter = require("./router/personalChatRouter");
const notificationRouter = require("./router/notificationRouter");

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
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/profile", profileRouter);
app.use("/my-advisor", myAdvisorRouter);
app.use("/appointment", appointmentRouter);
app.use("/group-chat", groupChatRouter);
app.use("/personal-chat", personalChatRouter);
app.use("/notification", notificationRouter);

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

	// for create-appointment start
	socket.on("join_room_appointment", (data) => {
		socket.join(data);
	});

	socket.on("send_appointment", ({ submitted, room }) => {
		io.to(room).emit("receive_appointment", submitted);
	});
	// for create-appointment end

	// for notification start
	socket.on("join_room_notification", (data) => {
		socket.join(data);
	});

	socket.on("send_notification", ({ notificationObject, room }) => {
		io.to(room).emit("receive_notification", notificationObject);
	});
	// for notification end
});
// socket section end

// submit on remote server start
if (process.env.NODE_ENV == "production") {
	app.use(express.static("build"));

	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname + "/build/index.html"));
	});
} else {
	app.get("/", (req, res) => {
		res.send("client disconnected");
	});
}
// submit on remote server end

// error handler
app.use(customErrorHandler);

// listening port
const port = process.env.PORT || 4000;

httpServer.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
