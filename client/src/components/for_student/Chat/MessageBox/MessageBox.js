// internal components
import ChatBox from "./ChatBox/ChatBox";
import Header from "./Header/Header";
import InputBox from "./InputBox/InputBox";
import "./MessageBox.css";

const MessageBox = ({ getMessages }) => {
	return (
		<>
			<div className="message-box">
				<Header getMessages={getMessages} />
				<ChatBox getMessages={getMessages} />
				<InputBox getMessages={getMessages} />
			</div>
		</>
	);
};

export default MessageBox;
