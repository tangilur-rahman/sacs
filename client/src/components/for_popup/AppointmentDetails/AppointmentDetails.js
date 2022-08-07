// external components
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";

// internal components
import "./AppointmentDetails.css";
import ReplyPopup from "./ReplyPopup/ReplyPopup";

const AppointmentDetails = ({ appDisplay, setAppDisplay }) => {
	// for pick date-time
	const [value, onChange] = useState();

	// for get reply-text
	const [replyText, setReplyText] = useState("");

	// for reply popup toggle
	const [replyPopup, setReplyPopup] = useState(false);

	// for outside click to close
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setAppDisplay(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [appDisplay]);

	// for fetch appointment-details
	const [specificApp, setSpecificApp] = useState("");

	const getSpecificApp = async () => {
		try {
			const response = await fetch(`/appointment/${appDisplay}`);

			const result = await response.json();

			if (response.status === 200) {
				setSpecificApp(result);
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
		getSpecificApp();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [appDisplay]);

	return (
		<>
			<div className="appointment-details-container">
				<div className="row m-0 layout-center">
					<div className="col-9 p-0">
						<div
							ref={myRef}
							className="appointment-details"
							id={replyPopup ? "blur" : ""}
						>
							{/* header section start  */}
							<div className="header">
								<div className="student-info">
									<img
										src="/assets/profile/tangil.png"
										alt="profile-img"
										className="profile-img img-fluid"
									/>

									<div className="info">
										<h6>Tangilur Rahman</h6>
										<h6>
											Id : <span>12</span>
										</h6>
									</div>
								</div>

								<div className="subject">
									<h3>
										{
											"ijoijfgof gjfogjfog foghs fghsg ishg ohgfigh fighsigh isgfghighsigfhsgiuh gifgh"
										}
									</h3>
								</div>

								<span className="icon" onClick={() => setAppDisplay(false)}>
									<i className="fa-solid fa-circle-xmark"></i>
								</span>
							</div>
							{/* header section end  */}

							{/* details section start  */}
							<div className="details">
								<div className="top-row for-margin">
									<div id="category">
										<span>Category&nbsp;:</span>
										<p>{specificApp.category}</p>
									</div>

									<div id="date">
										<span>Date&nbsp;:</span>
										<p>
											{moment(specificApp.createAt).format(
												"h:mm A - MMMM d, YYYY"
											)}
										</p>
									</div>
								</div>

								<div className="for-margin">
									<span>Description &nbsp;:</span>
									<div className="description">
										<p>lorem500</p>
									</div>
								</div>

								<div className="for-margin">
									<span>Attachments &nbsp;:</span>
									<div className="attachments">
										{specificApp.attachments &&
											specificApp.attachments.map((value, index) => {
												return (
													<a
														href={`uploads/attachments/${value}`}
														download
														key={index}
													>
														{value.split(/[-]/).slice(0, 1, -1) +
															"." +
															value.split(".").splice(-1)}
													</a>
												);
											})}
									</div>
								</div>

								{/* <div className="for-margin" id="status">
									<span>Status&nbsp;:</span>
									<p>{specificApp.category}</p>
								</div> */}
							</div>
							{/* details section start  */}

							{/* advisor-section start  */}
							<div className="advisor-section">
								<span>Appointment Date &nbsp;:</span>
								<div className="wrapper">
									<div className="app-date">
										<DateTimePicker
											onChange={onChange}
											value={value}
											className="date-picker"
										/>
									</div>

									<div className="app-status">
										<div id="solved">
											<div>Solved Appt..</div>
											<div className="icon-container">
												<i className="fa-solid fa-circle-check"></i>
											</div>
										</div>

										<div id="pending" className="active">
											<div> Pending Appt..</div>
											<div className="icon-container">
												<i className="fa-solid fa-hourglass-half"></i>
											</div>
										</div>

										<div id="rejected">
											<div>Rejected Appt..</div>
											<div className="icon-container">
												<i className="fa-solid fa-circle-xmark"></i>
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* advisor-section end  */}

							{/* reply-link start  */}
							<div className="reply-link">
								<h6 onClick={() => setReplyPopup(true)}>
									View all <span>3</span> replies
								</h6>
							</div>
							{/* reply-link end  */}

							{/* reply-box start  */}
							<div className="reply-box-container">
								<span>Reply &nbsp;:</span>

								<div className="reply-box">
									<TextareaAutosize
										placeholder="Your reply..."
										onChange={(e) => setReplyText(e.target.value)}
										minRows={2}
										id="reply-box"
									/>
									<button className="btn btn-success">Submit</button>
								</div>
							</div>
							{/* reply-box end  */}
						</div>
					</div>
				</div>

				{replyPopup && <ReplyPopup setReplyPopup={setReplyPopup} />}
			</div>
		</>
	);
};

export default AppointmentDetails;
