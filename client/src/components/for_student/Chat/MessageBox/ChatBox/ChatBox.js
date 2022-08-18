// external components
import ScrollToBottom from "react-scroll-to-bottom";
import sortArray from "sort-array";
import TimeAgo from "timeago-react";

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
			return (
				<img
					src={`uploads/attachments/${fileName}`}
					alt="reload for view"
					className="img-fluid"
				/>
			);
		} else if (extension === "mp3") {
			return (
				<audio controls alt="reload for view">
					<source src={`uploads/attachments/${fileName}`} type="audio/mp3" />
				</audio>
			);
		} else if (extension === "mp4" || extension === "mkv") {
			return (
				<video controls muted preload="meta" alt="reload for view">
					<source src={`uploads/attachments/${fileName}`} type="video/mp4" />
					<source src={`uploads/attachments/${fileName}`} type="video/mkv" />
				</video>
			);
		} else if (extension === "pdf") {
			return (
				<img
					src={`/assets/images/pdf.png`}
					alt="reload for view"
					className="img-fluid"
				/>
			);
		} else if (extension === "doc" || extension === "docx") {
			return (
				<img
					src={`/assets/images/doc.png`}
					alt="reload for view"
					className="img-fluid"
				/>
			);
		} else if (extension === "xlsx" || extension === "xls") {
			return (
				<img
					src={`/assets/images/xls.png`}
					alt="reload for view"
					className="img-fluid"
				/>
			);
		} else if (extension === "pptx" || extension === "ppt") {
			return (
				<img
					src={`/assets/images/ppt.png`}
					alt="reload for view"
					className="img-fluid"
				/>
			);
		}
	};
	// for attachment img view end

	return (
		<>
			{displayMessages ? (
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
												<div className="attachment-file">
													{fileViewHandler(message.attachment)}
												</div>

												<a
													href={`uploads/attachments/${message.attachment}`}
													download
													id={
														message.attachment.split(".").pop() === "mp3" ||
														message.attachment.split(".").pop() === "mp4" ||
														message.attachment.split(".").pop() === "mkv"
															? "when-other"
															: "when-image"
													}
												>
													{message.attachment.split(/[-]/).slice(0, 1, -1) +
														"." +
														message.attachment.split(".").slice(-1)[0]}
												</a>
												<div
													className="message-text"
													id={
														message.attachment.split(".").pop() === "mp3" ||
														message.attachment.split(".").pop() === "mp4" ||
														message.attachment.split(".").pop() === "mkv"
															? "when-other"
															: "when-image"
													}
												>
													{message.message}
												</div>
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
