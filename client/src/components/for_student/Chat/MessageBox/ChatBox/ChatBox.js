// external components
import ScrollToBottom from "react-scroll-to-bottom";
import TimeAgo from "timeago-react";
import sortArray from "sort-array";

// internal components
import { GetContextApi } from "../../../../../ContextApi";
import "./ChatBox.css";

const ChatBox = ({ displayMessages }) => {
	// for get current user
	const { currentUser } = GetContextApi();

	// for attachment img view start
	const fileViewHandler = (file) => {
		const fileName = file;
		const extension = file.split(".").pop();

		if (extension === "png" || extension === "jpg" || extension === "jpeg ") {
			return `uploads/attachments/${fileName}`;
		} else if (extension === "mp3") {
			return "/assets/images/mp3.png";
		} else if (extension === "mp4" || extension === "mkv") {
			return "/assets/images/mp4.png";
		} else if (extension === "pdf") {
			return "/assets/images/pdf.png";
		} else if (extension === "doc" || extension === "docx") {
			return "/assets/images/doc.png";
		} else if (extension === "xlsx" || extension === "xls") {
			return "/assets/images/xls.png";
		} else if (extension === "pptx" || extension === "ppt") {
			return "/assets/images/ppt.png";
		}
	};
	// for attachment img view end

	return (
		<>
			{displayMessages.length > 0 ? (
				<ScrollToBottom
					scrollViewClassName="chat-box-container"
					initialScrollBehavior="auto"
				>
					{displayMessages.length > 0 &&
						sortArray(displayMessages, {
							by: "time",
							order: "asc"
						}).map((message, index) => {
							return (
								<div
									className={
										currentUser.id === message.id
											? "message-info own"
											: "message-info other"
									}
									key={index}
								>
									<img
										src={`uploads/profile-img/${message.profile_img}`}
										alt="profile-img"
										className="profile-img img-fluid"
									/>

									<div className="message">
										{message.attachment ? (
											<div id="attachment">
												<div className="attachment-img">
													<img
														src={fileViewHandler(message.attachment)}
														alt="attachment-img"
														className="img-fluid"
													/>
												</div>

												<a
													href={`uploads/attachments/${message.attachment}`}
													download
												>
													{message.attachment.split(/[-]/).slice(0, 1, -1) +
														"." +
														message.attachment.split(".").slice(-1)[0]}
												</a>
												<div className="message-text">{message.message}</div>
											</div>
										) : (
											<div className="message-text">{message.message}</div>
										)}

										<div id="time">
											<TimeAgo datetime={message.time} />
										</div>
									</div>
								</div>
							);
						})}
				</ScrollToBottom>
			) : (
				<div className="welcome-chat">
					{currentUser?.role !== "administrator" && (
						<h3>
							Select &nbsp;
							<span>
								{currentUser?.role === "student" ? "Advisor" : "Student"}
							</span>
						</h3>
					)}
					<h2>Start Conversation 😊</h2>
				</div>
			)}
		</>
	);
};

export default ChatBox;
