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

	useEffect(() => {
		getGroupChat();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// for get or create group-chat end

	return (
		<>
			<div className="group-chat-container">
				<div className="row m-0">
					<div className="col-5 p-0">
						<UserBox getGroup={getGroup} />
					</div>
					<div className="col-7 p-0">
						<MessageBox getGroup={getGroup} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Chat;
