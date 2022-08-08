// external components
import Picker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

// internal components
import TextareaAutosize from "react-textarea-autosize";
import "./InputBox.css";

const InputBox = ({ getMessages }) => {
	// for get text-input
	const [input, setInput] = useState("");

	// for get attachment-file
	const [attachmentT, setAttachmentT] = useState(false);

	// eslint-disable-next-line no-unused-vars
	const [chosenEmoji, setChosenEmoji] = useState(null);
	const [emojiToggle, setEmojiToggle] = useState(false);

	// for outside click detect start
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
	// for outside click detect end

	// for emoji start
	const onEmojiClick = (event, emojiObject) => {
		setChosenEmoji(emojiObject);
		setInput(input + emojiObject.emoji);
		setEmojiToggle(false);
	};
	// for emoji end

	// for submit-handler start
	const submitHandler = async (event) => {
		event.preventDefault();
		try {
			const response = await fetch("/group-chat", {
				method: "PUT",
				body: JSON.stringify({
					_id: getMessages._id,
					message: input
				}),
				headers: { "Content-Type": "application/json" }
			});

			const result = await response.json();

			if (response.status === 200) {
				setInput("");
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

	// for submit-handler end

	// for when press enter start
	const onKeyDown = async (event) => {
		if (event.key === "Enter" && event.shiftKey) {
			return;
		} else if (event.key === "Enter") {
			event.preventDefault();
			try {
				const response = await fetch("/group-chat", {
					method: "PUT",
					body: JSON.stringify({
						_id: getMessages._id,
						message: input
					}),
					headers: { "Content-Type": "application/json" }
				});

				const result = await response.json();

				if (response.status === 200) {
					setInput("");
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
		}
	};
	// for when press enter end

	return (
		<>
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
						onChange={(event) => setInput(event.target.value)}
						onFocus={() => setEmojiToggle(false)}
						value={input}
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
					className={input ? "btn-active active" : "btn-active btn-inactive"}
					onClick={submitHandler}
				>
					Send
				</button>
			</div>

			<div className="receive-input">
				<input
					type="file"
					name="for-image"
					accept="image/*"
					id="for-image"
					style={{ display: "none" }}
					multiple
				/>
				<input
					type="file"
					name="for-video"
					accept="video/mp4, video/x-m4v,video/*"
					id="for-video"
					style={{ display: "none" }}
				/>

				<input
					type="file"
					accept="audio/mp3, audio/*;capture=microphone"
					name="for-audio"
					id="for-audio"
					style={{ display: "none" }}
				/>

				<input
					type="file"
					name="for-document"
					id="for-document"
					accept="application/pdf, application/vnd.ms-excel"
					style={{ display: "none" }}
				/>
			</div>
		</>
	);
};

export default InputBox;
