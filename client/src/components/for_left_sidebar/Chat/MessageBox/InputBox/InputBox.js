// external components
import Picker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "../../../../../ContextApi";
import "./InputBox.css";

const InputBox = ({
	getMessages,
	displayMessages,
	setDisplayMessages,
	setLatestGroup,
	setLatestPersonal
}) => {
	// for get current-user
	const { currentUser, mySocket, setNotifiUpdate } = GetContextApi();

	// for get socket-message from server
	const [socketMessage, setSocketMessage] = useState(null);

	// for get input-text
	const [inputText, setInputText] = useState("");

	// for get attachment input-text
	const [attachText, setAttachText] = useState("");

	// for attachment-file toggle
	const [attachmentT, setAttachmentT] = useState(false);

	// for file attachment-file
	const [getFile, setFile] = useState("");
	const [previewFile, setPreviewFile] = useState("");

	// for get emoji start
	const [emojiToggle, setEmojiToggle] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [chosenEmoji, setChosenEmoji] = useState(null);

	const onEmojiClick = (event, emojiObject) => {
		setChosenEmoji(emojiObject);
		setInputText(inputText + emojiObject.emoji);
		setAttachText(attachText + emojiObject.emoji);
		setEmojiToggle(false);
	};
	// for get emoji end

	// for outside click detect for attachment toggle start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setAttachmentT(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);
	// for outside click detect attachment toggle end

	// for outside click detect for attachment-file start
	const attachmentRef = useRef();

	const handleClickOutsideFile = (e) => {
		if (!attachmentRef.current?.contains(e.target)) {
			setFile("");
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutsideFile);
		return () =>
			document.removeEventListener("mousedown", handleClickOutsideFile);
	}, []);
	// for outside click detect attachment-file end

	// socket event start
	useEffect(() => {
		mySocket?.emit("join_room", getMessages.room);
		mySocket?.on("receive_message", (message) => {
			setSocketMessage(message);
		});

		setFile("");

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getMessages]);

	useEffect(() => {
		if (socketMessage) {
			setDisplayMessages([...displayMessages, socketMessage]);
			if (
				(currentUser.role === "advisor" &&
					getMessages.room === currentUser._id) ||
				(currentUser.role === "student" &&
					getMessages.room === currentUser.advisor._id)
			) {
				setLatestGroup(socketMessage);
			} else {
				setLatestPersonal(socketMessage);
			}
		} else {
			return;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socketMessage]);
	// socket event end

	// for submit-handler start
	const submitHandler = async () => {
		if (inputText) {
			// for send message socket start
			const messageObject = {
				id: currentUser?.id,
				profile_img: currentUser?.profile_img,
				message: inputText,
				time: Date.now()
			};

			const room = getMessages.room;

			mySocket?.emit("send_message", { messageObject, room });
			// for send message socket end

			// for send notification socket start
			if (
				!(
					(currentUser.role === "advisor" &&
						getMessages.room === currentUser._id) ||
					(currentUser.role === "student" &&
						getMessages.room === currentUser.advisor._id)
				)
			) {
				if (currentUser.role === "advisor") {
					const notificationObject = {
						id: getMessages.student._id,
						sender_name: getMessages.advisor.name,
						sender_profile: getMessages.advisor.profile_img,
						kind: "message",
						last_message: inputText,
						isRead: false,
						time: Date.now(),
						from_where: getMessages._id
					};

					mySocket?.emit("send_notification", {
						notificationObject,
						room: getMessages.student._id
					});

					setNotifiUpdate(notificationObject);
				} else if (currentUser.role === "student") {
					const notificationObject = {
						id: getMessages.advisor._id,
						sender_name: getMessages.student.name,
						sender_profile: getMessages.student.profile_img,
						kind: "message",
						last_message: inputText,
						isRead: false,
						time: Date.now(),
						from_where: getMessages._id
					};

					mySocket?.emit("send_notification", {
						notificationObject,
						room: getMessages.advisor._id
					});

					setNotifiUpdate(notificationObject);
				}
			} else {
				if (currentUser.role === "advisor") {
					const notificationObject = {
						id: `student-${getMessages.room}`,
						sender_name: currentUser.name,
						sender_profile: currentUser.profile_img,
						kind: "message",
						last_message: `${currentUser.name} send a message in group.`,
						isRead: false,
						time: Date.now(),
						from_where: getMessages._id
					};

					mySocket?.emit("send_group_notification", {
						notificationObject,
						room: getMessages.room
					});

					setNotifiUpdate(notificationObject);
				} else if (currentUser.role === "student") {
					const notificationObject = {
						id: `advisor-${getMessages.room}`,
						sender_name: currentUser.name,
						sender_profile: currentUser.profile_img,
						kind: "message",
						last_message: `${currentUser.name} send a message in group.`,
						isRead: false,
						time: Date.now(),
						from_where: getMessages._id
					};

					mySocket?.emit("send_group_notification", {
						notificationObject,
						room: getMessages.room
					});

					setNotifiUpdate(notificationObject);
				}
			}
			// for send notification socket end

			try {
				setInputText("");
				setAttachText("");

				if (
					(currentUser.role === "advisor" &&
						getMessages.room === currentUser._id) ||
					(currentUser.role === "student" &&
						getMessages.room === currentUser.advisor._id)
				) {
					const response = await fetch("/group-chat", {
						method: "PUT",
						body: JSON.stringify({
							_id: getMessages._id,
							message: inputText
						}),
						headers: { "Content-Type": "application/json" }
					});

					const result = await response.json();

					if (response.status === 200) {
						return;
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
				} else {
					const response = await fetch("/personal-chat", {
						method: "PUT",
						body: JSON.stringify({
							_id: getMessages._id,
							message: inputText
						}),
						headers: { "Content-Type": "application/json" }
					});

					const result = await response.json();

					if (response.status === 200) {
						setInputText("");
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
				}
			} catch (error) {
				toast.error(error.message, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
			}
		} else {
			return;
		}
	};
	// for submit-handler end

	// for when press enter start
	const onKeyDown = async (event) => {
		if (event.key === "Enter" && event.shiftKey) {
			return;
		} else if (event.key === "Enter") {
			event.preventDefault();

			if (inputText) {
				// for send message socket start
				const messageObject = {
					id: currentUser?.id,
					profile_img: currentUser?.profile_img,
					message: inputText,
					time: Date.now()
				};

				const room = getMessages.room;

				mySocket?.emit("send_message", { messageObject, room });
				// for send message socket end

				// for send notification socket start
				if (
					!(
						(currentUser.role === "advisor" &&
							getMessages.room === currentUser._id) ||
						(currentUser.role === "student" &&
							getMessages.room === currentUser.advisor._id)
					)
				) {
					if (currentUser.role === "advisor") {
						const notificationObject = {
							id: getMessages.student._id,
							sender_name: getMessages.advisor.name,
							sender_profile: getMessages.advisor.profile_img,
							kind: "message",
							last_message: inputText,
							isRead: false,
							time: Date.now(),
							from_where: getMessages._id
						};

						mySocket?.emit("send_notification", {
							notificationObject,
							room: getMessages.student._id
						});

						setNotifiUpdate(notificationObject);
					} else if (currentUser.role === "student") {
						const notificationObject = {
							id: getMessages.advisor._id,
							sender_name: getMessages.student.name,
							sender_profile: getMessages.student.profile_img,
							kind: "message",
							last_message: inputText,
							isRead: false,
							time: Date.now(),
							from_where: getMessages._id
						};

						mySocket?.emit("send_notification", {
							notificationObject,
							room: getMessages.advisor._id
						});

						setNotifiUpdate(notificationObject);
					}
				} else {
					if (currentUser.role === "advisor") {
						const notificationObject = {
							id: `student-${getMessages.room}`,
							sender_name: currentUser.name,
							sender_profile: currentUser.profile_img,
							kind: "message",
							last_message: `${currentUser.name} send a message in group.`,
							isRead: false,
							time: Date.now(),
							from_where: getMessages._id
						};

						mySocket?.emit("send_group_notification", {
							notificationObject,
							room: getMessages.room
						});

						setNotifiUpdate(notificationObject);
					} else if (currentUser.role === "student") {
						const notificationObject = {
							id: `advisor-${getMessages.room}`,
							sender_name: currentUser.name,
							sender_profile: currentUser.profile_img,
							kind: "message",
							last_message: `${currentUser.name} send a message in group.`,
							isRead: false,
							time: Date.now(),
							from_where: getMessages._id
						};

						mySocket?.emit("send_group_notification", {
							notificationObject,
							room: getMessages.room
						});

						setNotifiUpdate(notificationObject);
					}
				}
				// for send notification socket end

				try {
					setInputText("");
					setAttachText("");
					if (
						(currentUser.role === "advisor" &&
							getMessages.room === currentUser._id) ||
						(currentUser.role === "student" &&
							getMessages.room === currentUser.advisor._id)
					) {
						const response = await fetch("/group-chat", {
							method: "PUT",
							body: JSON.stringify({
								_id: getMessages._id,
								message: inputText
							}),
							headers: { "Content-Type": "application/json" }
						});

						const result = await response.json();

						if (response.status === 200) {
							return;
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
					} else {
						const response = await fetch("/personal-chat", {
							method: "PUT",
							body: JSON.stringify({
								_id: getMessages._id,
								message: inputText
							}),
							headers: { "Content-Type": "application/json" }
						});

						const result = await response.json();

						if (response.status === 200) {
							setInputText("");
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
					}
				} catch (error) {
					toast.error(error.message, {
						position: "top-right",
						theme: "colored",
						autoClose: 3000
					});
				}
			} else {
				return;
			}
		}
	};
	// for when press enter end

	// for file preview start
	useEffect(() => {
		if (getFile) {
			const extension = getFile.name.split(".").pop();

			if (extension === "png" || extension === "jpg" || extension === "jpeg ") {
				const reader = new FileReader();
				reader.onload = () => {
					if (reader.readyState === 2) {
						setPreviewFile(reader.result);
					}
				};
				reader.readAsDataURL(getFile);
			} else if (extension === "mp3") {
				setPreviewFile("/assets/images/mp3.png");
			} else if (extension === "mp4" || extension === "mkv") {
				setPreviewFile("/assets/images/mp4.png");
			} else if (extension === "pdf") {
				setPreviewFile("/assets/images/pdf.png");
			} else if (extension === "doc" || extension === "docx") {
				setPreviewFile("/assets/images/doc.png");
			} else if (extension === "xlsx" || extension === "xls") {
				setPreviewFile("/assets/images/xls.png");
			} else if (extension === "pptx" || extension === "ppt") {
				setPreviewFile("/assets/images/ppt.png");
			} else {
				toast.error("Invalid file", {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
			}
		}
	}, [getFile]);
	// for file preview start

	// for file submit handler start
	const fileSubmitHandler = async (event) => {
		event.preventDefault();
		if (getFile) {
			// for send message socket start
			const messageObject = {
				id: currentUser?.id,
				profile_img: currentUser?.profile_img,
				attachment: getFile.name,
				message: attachText,
				time: Date.now()
			};

			const room = getMessages.room;

			mySocket?.emit("send_message", { messageObject, room });
			// for send message socket end

			// for send notification socket start
			if (
				!(
					(currentUser.role === "advisor" &&
						getMessages.room === currentUser._id) ||
					(currentUser.role === "student" &&
						getMessages.room === currentUser.advisor._id)
				)
			) {
				if (currentUser.role === "advisor") {
					const notificationObject = {
						id: getMessages.student._id,
						sender_name: getMessages.advisor.name,
						sender_profile: getMessages.advisor.profile_img,
						kind: "message",
						last_message: attachText ? attachText : "send a attachment.",
						isRead: false,
						time: Date.now(),
						from_where: getMessages._id
					};

					mySocket.emit("send_notification", {
						notificationObject,
						room: getMessages.student._id
					});

					setNotifiUpdate(notificationObject);
				} else if (currentUser.role === "student") {
					const notificationObject = {
						id: getMessages.advisor._id,
						sender_name: getMessages.student.name,
						sender_profile: getMessages.student.profile_img,
						kind: "message",
						last_message: attachText ? attachText : "send a attachment.",
						isRead: false,
						time: Date.now(),
						from_where: getMessages._id
					};

					mySocket.emit("send_notification", {
						notificationObject,
						room: getMessages.advisor._id
					});

					setNotifiUpdate(notificationObject);
				}
			} else {
				if (currentUser.role === "advisor") {
					const notificationObject = {
						id: `student-${getMessages.room}`,
						sender_name: currentUser.name,
						sender_profile: currentUser.profile_img,
						kind: "message",
						last_message: `${currentUser.name} send a attachment in group.`,
						isRead: false,
						time: Date.now(),
						from_where: getMessages._id
					};

					mySocket?.emit("send_group_notification", {
						notificationObject,
						room: getMessages.room
					});

					setNotifiUpdate(notificationObject);
				} else if (currentUser.role === "student") {
					const notificationObject = {
						id: `advisor-${getMessages.room}`,
						sender_name: currentUser.name,
						sender_profile: currentUser.profile_img,
						kind: "message",
						last_message: `${currentUser.name} send a attachment in group.`,
						isRead: false,
						time: Date.now(),
						from_where: getMessages._id
					};

					mySocket?.emit("send_group_notification", {
						notificationObject,
						room: getMessages.room
					});

					setNotifiUpdate(notificationObject);
				}
			}
			// for send notification socket end

			try {
				setFile(false);
				setAttachText("");
				setInputText("");

				const formData = new FormData();

				formData.append("_id", getMessages._id);
				formData.append("message", attachText);
				formData.append("file", getFile);

				if (
					(currentUser.role === "advisor" &&
						getMessages.room === currentUser._id) ||
					(currentUser.role === "student" &&
						getMessages.room === currentUser.advisor._id)
				) {
					const response = await fetch("/group-chat/file", {
						method: "PUT",
						body: formData
					});

					const result = await response.json();

					if (response.status === 200) {
						return;
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
				} else {
					const response = await fetch("/personal-chat/file", {
						method: "PUT",
						body: formData
					});

					const result = await response.json();

					if (response.status === 200) {
						return;
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
				}
			} catch (error) {
				toast.error(error.message, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
			}
		} else {
			return;
		}
	};
	// for file submit handler end

	return (
		<>
			{!getFile ? (
				<div className="input-box-container">
					<span className="attachment-container" ref={myRef}>
						<i
							className="fa-solid fa-paperclip icon"
							onClick={() => setAttachmentT(!attachmentT)}
						></i>

						<div className="attachments">
							<span
								className={attachmentT ? "active" : "inactive"}
								onClick={() => setAttachmentT(!attachmentT)}
							>
								<label htmlFor="for-image">
									<i className="bi bi-image"></i>
								</label>
							</span>

							<span
								className={attachmentT ? "active" : "inactive"}
								onClick={() => setAttachmentT(!attachmentT)}
							>
								<label htmlFor="for-video">
									<i className="bi bi-file-earmark-play"></i>
								</label>
							</span>

							<span
								className={attachmentT ? "active" : "inactive"}
								onClick={() => setAttachmentT(!attachmentT)}
							>
								<label htmlFor="for-audio">
									<i className="bi bi-file-earmark-music"></i>
								</label>
							</span>

							<span
								className={attachmentT ? "active" : "inactive"}
								onClick={() => setAttachmentT(!attachmentT)}
							>
								<label htmlFor="for-document">
									<i className="bi bi-file-earmark-text"></i>
								</label>
							</span>
						</div>
					</span>
					<div className="input-box">
						<TextareaAutosize
							autoFocus
							placeholder="Type a message..."
							id="text-area"
							onChange={(event) => setInputText(event.target.value)}
							onFocus={() => setEmojiToggle(false)}
							value={inputText}
							autoComplete="off"
							onKeyDown={onKeyDown}
						/>

						<span onClick={() => setEmojiToggle(!emojiToggle)}>
							<i className="bi bi-emoji-heart-eyes icon"></i>
							{emojiToggle && (
								<Picker
									onEmojiClick={onEmojiClick}
									pickerStyle={{
										position: "absolute",
										bottom: "49px",
										width: "300px",
										right: "0"
									}}
								/>
							)}
						</span>
					</div>
					<button
						className={
							inputText ? "btn-active active" : "btn-active btn-inactive"
						}
						onClick={submitHandler}
					>
						Send
					</button>
				</div>
			) : (
				<div ref={attachmentRef} className="file-preview">
					<div className="file">
						<img src={previewFile} alt="preview" />
					</div>

					<h6>{getFile.name}</h6>

					<div className="input-box">
						<TextareaAutosize
							autoFocus
							placeholder="Type a message..."
							id="text-area"
							onChange={(event) => setAttachText(event.target.value)}
							onFocus={() => setEmojiToggle(false)}
							value={attachText}
							autoComplete="off"
							onKeyDown={onKeyDown}
						/>

						<span onClick={() => setEmojiToggle(!emojiToggle)}>
							<i className="bi bi-emoji-heart-eyes icon"></i>
							{emojiToggle && (
								<Picker
									onEmojiClick={onEmojiClick}
									pickerStyle={{
										position: "absolute",
										bottom: "49px",
										width: "300px",
										right: "0"
									}}
								/>
							)}
						</span>
					</div>
					<div className="preview-btn-container">
						<button
							type="button"
							className="btn btn-danger"
							onClick={() => setFile("")}
						>
							Cancel
						</button>
						<button
							type="button"
							className="btn btn-success"
							onClick={fileSubmitHandler}
						>
							Submit
						</button>
					</div>
				</div>
			)}

			<div className="receive-input">
				<input
					type="file"
					name="for-image"
					accept="image/*"
					id="for-image"
					style={{ display: "none" }}
					onChange={(file) => setFile(file.target.files[0])}
				/>

				<input
					type="file"
					name="for-video"
					accept="video/mp4, video/x-m4v,video/*"
					id="for-video"
					style={{ display: "none" }}
					onChange={(file) => setFile(file.target.files[0])}
				/>

				<input
					type="file"
					accept="audio/mp3, audio/*;capture=microphone"
					name="for-audio"
					id="for-audio"
					style={{ display: "none" }}
					onChange={(file) => setFile(file.target.files[0])}
				/>

				<input
					type="file"
					name="for-document"
					id="for-document"
					accept="application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.slideshow,application/vnd.openxmlformats-officedocument.presentationml.presentation, application/*"
					style={{ display: "none" }}
					onChange={(file) => setFile(file.target.files[0])}
				/>
			</div>
		</>
	);
};

export default InputBox;
