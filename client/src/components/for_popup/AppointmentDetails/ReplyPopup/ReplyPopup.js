// external components
import { useEffect, useRef } from "react";

// internal components
import { d_message } from "./../../../../dummy_data";
import "./ReplyPopup.css";

const ReplyPopup = ({ setReplyPopup }) => {
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
		<div className="popup-container">
			<div className="row wrapper" ref={modalRef}>
				<div className="col-8">
					<div ref={myRef} className="reply-popup">
						{d_message &&
							d_message.map((reply, index) => {
								return (
									<div
										className={
											reply.user_id === "1"
												? "reply-info own"
												: "reply-info other"
										}
										key={index}
									>
										<img
											src={reply.img}
											alt="profile-img"
											className="profile-img img-fluid"
										/>

										<div className="reply">
											<div id="text">{reply.message}</div>
											<div id="time">{reply.time}</div>
										</div>
									</div>
								);
							})}

						<span className="icon" onClick={() => setReplyPopup(false)}>
							<i className="fa-solid fa-circle-xmark"></i>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReplyPopup;
