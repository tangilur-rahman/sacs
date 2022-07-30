// internal components
import "./GroupChat.css";
import MessageBox from "./MessageBox/MessageBox";
import UserBox from "./UserBox/UserBox";

const GroupChat = () => {
	return (
		<>
			<div className="group-chat-container">
				<div className="row m-0">
					<div className="col-5 p-0">
						<UserBox />
					</div>
					<div className="col-7 p-0">
						<MessageBox />
					</div>
				</div>
			</div>
		</>
	);
};

export default GroupChat;
