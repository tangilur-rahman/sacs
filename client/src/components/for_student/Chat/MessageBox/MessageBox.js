// external components
import { useEffect, useState } from "react";

// internal components
import ChatBox from "./ChatBox/ChatBox";
import Header from "./Header/Header";
import InputBox from "./InputBox/InputBox";
import "./MessageBox.css";

const MessageBox = ({ getMessages, setLatestGroup, setLatestPersonal }) => {
	// for rending messages array
	const [displayMessages, setDisplayMessages] = useState([]);

	useEffect(() => {
		setDisplayMessages(getMessages.messages);
	}, [getMessages]);

	return (
		<>
			<div className="message-box">
				<Header getMessages={getMessages} />
				<ChatBox displayMessages={displayMessages} />
				<InputBox
					getMessages={getMessages}
					displayMessages={displayMessages}
					setDisplayMessages={setDisplayMessages}
					setLatestGroup={setLatestGroup}
					setLatestPersonal={setLatestPersonal}
				/>
			</div>
		</>
	);
};

export default MessageBox;
