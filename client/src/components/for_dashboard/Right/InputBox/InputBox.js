// internal components
import TextareaAutosize from "react-textarea-autosize";
import "./InputBox.css";

const InputBox = () => {
	return (
		<>
			<div className="input-box-container">
				<i className="fa-solid fa-paperclip icon" id="attachment"></i>
				<div className="input-box">
					<TextareaAutosize
						autoFocus
						placeholder="Type a message..."
						id="text-area"
					/>
					<i className="bi bi-emoji-heart-eyes icon"></i>
				</div>
				<button>Send</button>
			</div>
		</>
	);
};

export default InputBox;
