// internal components
import { d_message } from "../../../../../dummy_data";
import "./ChatBox.css";

const ChatBox = () => {
	return (
		<>
			<div className="chat-box-container">
				{d_message &&
					d_message.map((message, index) => {
						return (
							<div
								className={
									message.user_id === "1"
										? "message-info own"
										: "message-info other"
								}
								key={index}
							>
								<img
									src={message.img}
									alt="profile-img"
									className="profile-img img-fluid"
								/>

								<div className="message">
									<div id="text">{message.message}</div>
									<div id="time">{message.time}</div>
								</div>
							</div>
						);
					})}
			</div>
		</>
	);
};

export default ChatBox;
