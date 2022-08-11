// external components
import ScrollToBottom from "react-scroll-to-bottom";
import TimeAgo from "timeago-react";

// internal components
import { GetContextApi } from "../../../../../ContextApi";
import "./ChatBox.css";

const ChatBox = ({ displayMessages }) => {
	// for get current user
	const { currentUser } = GetContextApi();

	return (
		<>
			<ScrollToBottom
				scrollViewClassName="chat-box-container"
				initialScrollBehavior="auto"
			>
				{displayMessages.length > 0 &&
					displayMessages.map((message, index) => {
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
									<div id="text">{message.message}</div>
									<div id="time">
										<TimeAgo datetime={message.time} />
									</div>
								</div>
							</div>
						);
					})}
			</ScrollToBottom>
		</>
	);
};

export default ChatBox;
