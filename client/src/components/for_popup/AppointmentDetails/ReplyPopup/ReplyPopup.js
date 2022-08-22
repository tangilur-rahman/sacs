// external components
import { useEffect, useRef } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import TextareaAutosize from "react-textarea-autosize";
import TimeAgo from "timeago-react";

// internal components
import "./ReplyPopup.css";

const ReplyPopup = ({
	setReplyPopup,
	specificApp,
	currentUser,
	replyText,
	setReplyText,
	submitHandler
}) => {
	// for outside click to close start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setReplyPopup(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// for outside click to close end

	// for inside clicked stop-propagation start
	const modalRef = useRef();

	useEffect(() => {
		const stopPropagation = (e) => {
			e.stopPropagation();
		};

		const { current: modalDom } = modalRef;
		modalDom.addEventListener("mousedown", stopPropagation);

		return () => {
			modalDom.removeEventListener("mousedown", stopPropagation);
		};
	}, []);
	// for inside clicked stop-propagation end

	return (
		<div className="popup-container" data-aos="fade-down" data-aos-delay="0">
			<div className="row wrapper" ref={modalRef}>
				<div className="col-8 reply-popup-container">
					<ScrollToBottom
						scrollViewClassName={
							currentUser.role === "administrator"
								? "reply-popup increase-height"
								: "reply-popup"
						}
						initialScrollBehavior="auto"
						ref={myRef}
					>
						{specificApp.reply &&
							specificApp.reply.map((reply, index) => {
								return (
									<div
										className={
											parseInt(currentUser.id) === reply.id
												? "reply-info own"
												: "reply-info other"
										}
										key={index}
									>
										<img
											src={`uploads/profile-img/${reply.profile_img}`}
											alt="profile-img"
											className="profile-img img-fluid"
										/>

										<div className="reply">
											<div id="text">{reply.comment}</div>
											<div id="time">{<TimeAgo datetime={reply.date} />}</div>
										</div>
									</div>
								);
							})}
					</ScrollToBottom>

					{/* reply-input-container start  */}
					{currentUser.role !== "administrator" && (
						<div className="reply-input-container">
							<TextareaAutosize
								placeholder="Your reply..."
								onChange={(e) => setReplyText(e.target.value)}
								minRows={1}
								id="reply-box"
								value={replyText}
								autoFocus
							/>

							<div className="reply-btn-container">
								<button
									type="button"
									className="btn btn-danger"
									onClick={() => setReplyPopup(false)}
								>
									Cancel
								</button>

								<button className="btn btn-success" onClick={submitHandler}>
									Submit
								</button>
							</div>
						</div>
					)}

					{/* reply-input-container end  */}

					{/* cancel icon start  */}
					<span className="icon" onClick={() => setReplyPopup(false)}>
						<i className="fa-solid fa-circle-xmark"></i>
					</span>
					{/* cancel icon end  */}
				</div>
			</div>
		</div>
	);
};

export default ReplyPopup;
