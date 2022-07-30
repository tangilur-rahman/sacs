// internal components
import ChatBox from "./ChatBox/ChatBox";
import Header from "./Header/Header";
import InputBox from "./InputBox/InputBox";
import "./MessageBox.css";

const MessageBox = () => {
	return (
		<>
			<div className="message-box">
				<Header />
				<ChatBox />
				<InputBox />
			</div>
		</>
	);
};

export default MessageBox;
