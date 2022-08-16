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
		if (getMessages) {
			const messageArray = getMessages.messages;

			const attachmentArray = getMessages.attachments;

			setDisplayMessages(messageArray.concat(attachmentArray));
		}
	}, [getMessages]);

	return (
		<>
			<div className="message-box">
				{getMessages && <Header getMessages={getMessages} />}

				<ChatBox displayMessages={displayMessages} />

				{getMessages && (
					<InputBox
						getMessages={getMessages}
						displayMessages={displayMessages}
						setDisplayMessages={setDisplayMessages}
						setLatestGroup={setLatestGroup}
						setLatestPersonal={setLatestPersonal}
					/>
				)}
			</div>
		</>
	);
};

export default MessageBox;
