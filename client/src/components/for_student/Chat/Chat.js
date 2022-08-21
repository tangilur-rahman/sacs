// external components
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GetContextApi } from "../../../ContextApi";

// internal components
import "./Chat.css";
import MessageBox from "./MessageBox/MessageBox";
import UserBox from "./UserBox/UserBox";

const Chat = ({ messageId }) => {
	// for get current user
	const { currentUser } = GetContextApi();

	// check fetching complete or not for user-box
	const [isLoading, setIsLoading] = useState(true);

	// for get messages for display in chat-box
	const [getMessages, setMessages] = useState("");

	// get latest message & time
	const [latestGroup, setLatestGroup] = useState("");
	const [latestPersonal, setLatestPersonal] = useState("");

	// for get search input field value & applied
	const [search, setSearch] = useState("");
	const [searchUser, setSearchUser] = useState("");
	const [selectedSearch, setSelectedSearch] = useState("");

	// for get or create group-chat start
	const [getGroup, setGroup] = useState("");

	// for refetching group again when group edit
	const [reloadGroup, setReloadGroup] = useState("");

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
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reloadGroup]);
	// for get or create group-chat end

	// for get or create personal-chat start
	const [getPersonal, setPersonal] = useState("");

	const getPersonalChat = async () => {
		// when student start
		if (currentUser.role === "student") {
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
			// when student end

			// when advisor start
		} else if (currentUser.role === "advisor") {
			if (search) {
				// searching start
				try {
					const response = await fetch(`/personal-chat/${search}`);
					const result = await response.json();
					if (response.status === 200) {
						setSearchUser(result);
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
				// searching end
			} else if (selectedSearch) {
				// for get or create using selected search result start

				try {
					const response = await fetch("/personal-chat", {
						method: "POST",
						body: JSON.stringify({
							student_id: selectedSearch.id,
							advisor_id: selectedSearch.advisor.id
						}),
						headers: { "Content-Type": "application/json" }
					});
					const result = await response.json();

					if (response.status === 200) {
						setPersonal([...getPersonal, result]);
						setMessages(result);
						setSearchUser("");
						setSelectedSearch("");
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
			// for get or create using selected search result end
			else {
				// for get advisor's all student
				try {
					const response = await fetch("/personal-chat");

					const result = await response.json();

					if (response.status === 200) {
						setPersonal(result);
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
		}
	};

	useEffect(() => {
		if (currentUser) {
			getPersonalChat();
			setTimeout(() => {
				setIsLoading(false);
			}, 1000);
		}

		if (!search) {
			setSearchUser("");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search, getMessages]);
	// for get or create personal-chat end

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
								search={search}
								setSearch={setSearch}
								setSearchUser={setSearchUser}
								searchUser={searchUser}
								setSelectedSearch={setSelectedSearch}
								isLoading={isLoading}
							/>
						)}
					</div>
					<div className="col-7 p-0">
						<MessageBox
							getMessages={getMessages}
							setMessages={setMessages}
							setLatestGroup={setLatestGroup}
							setLatestPersonal={setLatestPersonal}
							setReloadGroup={setReloadGroup}
							messageId={messageId}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Chat;
