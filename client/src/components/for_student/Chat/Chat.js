// external components
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GetContextApi } from "../../../ContextApi";

// internal components
import "./Chat.css";
import MessageBox from "./MessageBox/MessageBox";
import UserBox from "./UserBox/UserBox";

const Chat = () => {
	const { currentUser } = GetContextApi();

	// for get messages for display in message-box
	const [getMessages, setMessages] = useState("");

	// get latest message & time
	const [latestGroup, setLatestGroup] = useState("");
	const [latestPersonal, setLatestPersonal] = useState("");

	// for get or create group-chat start
	const [getGroup, setGroup] = useState("");

	const getGroupChat = async () => {
		try {
			const response = await fetch("/group-chat", {
				method: "POST",
				body: JSON.stringify({
					department: currentUser.department,
					semester: currentUser.semester,
					year: currentUser.year
				}),
				headers: { "Content-Type": "application/json" }
			});

			const result = await response.json();

			if (response.status === 200) {
				setGroup(result);
			} else if (response.status === 400) {
				toast(result.message, {
					position: "top-right",
					theme: "dark",
					autoClose: 3000
				});
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
	};

	// for get or create group-chat end

	// for get or create personal-chat start
	const [getPersonal, setPersonal] = useState("");

	const getPersonalChat = async () => {
		try {
			const response = await fetch("/personal-chat", {
				method: "POST",
				body: JSON.stringify({
					student_id: currentUser.id,
					advisor_id: currentUser.advisor.id
				}),
				headers: { "Content-Type": "application/json" }
			});

			const result = await response.json();

			if (response.status === 200) {
				setPersonal(result);
			} else if (response.status === 400) {
				toast(result.message, {
					position: "top-right",
					theme: "dark",
					autoClose: 3000
				});
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
	};

	useEffect(() => {
		if (currentUser) {
			getGroupChat();
			getPersonalChat();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// for get or create group-chat end

	return (
		<>
			<div className="group-chat-container">
				<div className="row m-0">
					<div className="col-5 p-0">
						{getGroup && getPersonal && (
							<UserBox
								getGroup={getGroup}
								getPersonal={getPersonal}
								setMessages={setMessages}
								latestGroup={latestGroup}
								setLatestGroup={setLatestGroup}
								latestPersonal={latestPersonal}
								setLatestPersonal={setLatestPersonal}
							/>
						)}
					</div>
					<div className="col-7 p-0">
						{getMessages && (
							<MessageBox
								getMessages={getMessages}
								setLatestGroup={setLatestGroup}
								setLatestPersonal={setLatestPersonal}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Chat;
