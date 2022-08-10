// external components
import { useState } from "react";

// internal components
import ChatBox from "./ChatBox/ChatBox";
import Header from "./Header/Header";
import InputBox from "./InputBox/InputBox";
import "./MessageBox.css";

const MessageBox = ({ getMessages }) => {
	// for rending messages array
	const [displayMessages, setDisplayMessages] = useState(getMessages.messages);
	return (
		<>
			<div className="message-box">
				<Header getMessages={getMessages} />
				<ChatBox displayMessages={displayMessages} />
				<InputBox
					getMessages={getMessages}
					displayMessages={displayMessages}
					setDisplayMessages={setDisplayMessages}
				/>
			</div>
		</>
	);
};

export default MessageBox;
