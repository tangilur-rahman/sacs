// external components
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// internal components
import ChatBox from "./ChatBox/ChatBox";
import Header from "./Header/Header";
import InputBox from "./InputBox/InputBox";
import "./MessageBox.css";

const MessageBox = ({
	getMessages,
	setMessages,
	setLatestGroup,
	setLatestPersonal,
	setReloadGroup,
	messageId
}) => {
	// for rending messages array
	const [displayMessages, setDisplayMessages] = useState("");

	// for get specific message document from notification
	const [document, setDocument] = useState("");

	useEffect(() => {
		if (messageId && !getMessages) {
			(async () => {
				try {
					const response = await fetch(
						`/personal-chat/notification/${messageId}`
					);
					const result = await response.json();
					if (response.status === 200) {
						if (result) {
							setMessages(result);
							setDocument(true);
						} else {
							return;
						}
					} else if (result.error) {
						toast.error(result.error, {
							position: "top-right",
							theme: "colored",
							autoClose: 3000
						});
					}
				} catch (error) {
					toast.error(error.message, {
						position: "top-right",
						theme: "colored",
						autoClose: 3000
					});
				}

				if (!document) {
					try {
						const response = await fetch(
							`/group-chat/notification/${messageId}`
						);
						const result = await response.json();
						if (response.status === 200) {
							if (result) {
								setMessages(result);
							} else {
								return;
							}
						} else if (result.error) {
							toast.error(result.error, {
								position: "top-right",
								theme: "colored",
								autoClose: 3000
							});
						}
					} catch (error) {
						toast.error(error.message, {
							position: "top-right",
							theme: "colored",
							autoClose: 3000
						});
					}
				}
			})();
		} else {
			return;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// for get all messages & attachments
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
				{getMessages && (
					<Header getMessages={getMessages} setReloadGroup={setReloadGroup} />
				)}

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
