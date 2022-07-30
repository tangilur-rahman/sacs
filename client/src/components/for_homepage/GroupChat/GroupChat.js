// internal components
import "./GroupChat.css";
import UserBox from "./UserBox/UserBox";

const GroupChat = () => {
	return (
		<>
			<div className="group-chat-container">
				<div className="row">
					<div className="col-5">
						<UserBox />
					</div>
					<div className="col-7"></div>
				</div>
			</div>
		</>
	);
};

export default GroupChat;
