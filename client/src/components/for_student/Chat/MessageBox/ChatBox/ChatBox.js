// external components
import TimeAgo from "timeago-react";

// internal components
import { GetContextApi } from "../../../../../ContextApi";
import "./ChatBox.css";

const ChatBox = ({ getMessages }) => {
	const { currentUser } = GetContextApi();

	return (
		<>
			<div className="chat-box-container">
				{getMessages.messages.map((message, index) => {
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
			</div>
		</>
	);
};

export default ChatBox;
