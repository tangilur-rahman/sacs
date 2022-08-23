// external components
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "../../../../ContextApi";
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
	// for get current-user
	const { currentUser } = GetContextApi();

	// for rending messages array
	const [displayMessages, setDisplayMessages] = useState("");

	// for personal message start
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
			})();
		} else {
			return;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messageId]);
	// for personal message end

	// for group message start
	useEffect(() => {
		if (messageId && !getMessages) {
			(async () => {
				try {
					const response = await fetch(`/group-chat/notification/${messageId}`);
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
			})();
		} else {
			return;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messageId]);
	// for group message end

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
			{getMessages ? (
				<div className="message-box">
					{getMessages && (
						<Header getMessages={getMessages} setReloadGroup={setReloadGroup} />
					)}

					<ChatBox
						displayMessages={displayMessages}
						getMessages={getMessages}
					/>

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
			) : (
				<div className="welcome-chat">
					{currentUser?.role !== "administrator" && (
						<h3>
							Select &nbsp;
							<span>
								{currentUser?.role === "student" ? "Advisor" : "Student"}
							</span>
						</h3>
					)}
					<h2>Start Conversation 😊</h2>
				</div>
			)}
		</>
	);
};

export default MessageBox;
