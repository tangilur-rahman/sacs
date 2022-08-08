// external components
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "../../../ContextApi";
import "./AppointmentDetails.css";
import ReplyPopup from "./ReplyPopup/ReplyPopup";

const AppointmentDetails = ({ appDisplay, setAppDisplay, currentUser }) => {
	// for updating dashboard
	const { setIsSubmitted } = GetContextApi();

	// for reply popup toggle
	const [replyPopup, setReplyPopup] = useState(false);

	// for get single appointment
	const [specificApp, setSpecificApp] = useState("");

	// for pick date-time
	const [picDate, setPicDate] = useState("");

	// for get reply-text & status
	const [replyText, setReplyText] = useState("");
	const [getStatus, setStatus] = useState("");

	// for value change fetching again
	const [checked, setChecked] = useState("");

	// for checking read or unread
	const [isRead, setIsRead] = useState(false);

	// for outside click to close start
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
	}, []);
	// for outside click to close end

	// for fetch single appointment-details start
	const getSpecificApp = async () => {
		try {
			const response = await fetch(`/appointment/${appDisplay}`);

			const result = await response.json();

			if (response.status === 200) {
				setSpecificApp(result);
				setStatus(result.status);
				setPicDate(result.appointment_date);
				setIsRead(result.isRead);
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
	}, [appDisplay, checked]);
	// for fetch single appointment-details end

	// for update unread start
	useEffect(() => {
		if (isRead === false && currentUser.role === "advisor") {
			(async () => {
				try {
					const response = await fetch("/appointment/read", {
						method: "PUT",
						body: JSON.stringify({
							_id: appDisplay
						}),
						headers: { "Content-Type": "application/json" }
					});

					const result = await response.json();

					if (response.status === 200) {
						setIsSubmitted(Date.now());
						return;
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
	}, []);
	// for update unread end

	// for submit currentUser reply start
	const submitHandler = async () => {
		if (!(picDate || replyText || getStatus !== specificApp.status)) {
			toast("Nothing have to sumit", {
				position: "top-right",
				theme: "dark",
				autoClose: 2000
			});
		} else {
			try {
				const response = await fetch("/appointment/update", {
					method: "PUT",
					body: JSON.stringify({
						_id: specificApp._id,
						picDate,
						replyText,
						getStatus
					}),
					headers: { "Content-Type": "application/json" }
				});

				const result = await response.json();

				if (response.status === 200) {
					toast.success(result.message, {
						position: "top-right",
						theme: "colored",
						autoClose: 3000
					});
					setChecked(Date.now());
					setIsSubmitted(Date.now());
					setReplyText("");
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
	// for submit currentUser reply end

	return (
		<>
			<div className="appointment-details-container">
				<div className="row m-0 layout-center">
					<div className="col-9 p-0">
						<div
							ref={myRef}
							className="appointment-details"
							id={replyPopup ? "appt-blur" : ""}
						>
							{/* header section start  */}
							<div className="header">
								{currentUser.role === "advisor" && (
									<div className="student-info">
										<img
											src={`uploads/profile-img/${specificApp.student?.profile_img}`}
											alt="profile-img"
											className="profile-img img-fluid"
										/>

										<div className="info">
											<h6>{specificApp.student?.name}</h6>
											<h6>
												Id&nbsp;: &nbsp;<span>{specificApp.student?.id}</span>
											</h6>
										</div>
									</div>
								)}

								<div className="subject">
									<h3>{specificApp?.subject}</h3>
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
										<p>{specificApp?.category}</p>
									</div>

									<div id="date">
										<span>Date&nbsp;:</span>
										<p>
											{moment(specificApp?.createdAt).format(
												"h:mm A - MMMM DD, YYYY"
											)}
										</p>
									</div>
								</div>

								<div className="for-margin">
									<span>Description &nbsp;:</span>
									<div className="description">
										<p>{specificApp?.description}</p>
									</div>
								</div>

								<div className="for-margin">
									<span>Attachments &nbsp;:</span>
									<div className="attachments">
										{specificApp.attachments?.length > 0 ? (
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
											})
										) : (
											<h6>Null</h6>
										)}
									</div>
								</div>

								{currentUser.role === "student" && (
									<div className="for-margin" id="status">
										<span>Curr.. &nbsp;Status&nbsp;:</span>
										<p>{specificApp?.status}</p>
									</div>
								)}

								{currentUser.role === "student" && (
									<div className="for-margin" id="appointment-date">
										<span>Appt.. &nbsp;Date&nbsp;:</span>
										{specificApp?.appointment_date ? (
											<p>
												{moment(specificApp?.appointment_date).format(
													"h:mm A - MMMM DD, YYYY"
												)}
											</p>
										) : (
											<p>Null</p>
										)}
									</div>
								)}
							</div>
							{/* details section start  */}

							{/* advisor-section start  */}
							{currentUser.role === "advisor" && (
								<div className="advisor-section">
									<span>Appointment Date &nbsp;:</span>
									<div className="wrapper">
										<div className="app-date">
											<DateTimePicker
												onChange={(date) => setPicDate(date)}
												value={picDate}
												className="date-picker"
											/>
										</div>

										<div className="app-status">
											<div
												id="solved"
												className={getStatus === "solved" ? "active" : ""}
												onClick={() => setStatus("solved")}
											>
												<div>Solved Appt..</div>
												<div className="icon-container">
													<i className="fa-solid fa-circle-check"></i>
												</div>
											</div>

											<div
												id="pending"
												className={getStatus === "pending" ? "active" : ""}
												onClick={() => setStatus("pending")}
											>
												<div> Pending Appt..</div>
												<div className="icon-container">
													<i className="fa-solid fa-hourglass-half"></i>
												</div>
											</div>

											<div
												id="rejected"
												className={getStatus === "rejected" ? "active" : ""}
												onClick={() => setStatus("rejected")}
											>
												<div>Rejected Appt..</div>
												<div className="icon-container">
													<i className="fa-solid fa-circle-xmark"></i>
												</div>
											</div>
										</div>
									</div>
								</div>
							)}

							{/* advisor-section end  */}

							{/* reply-link start  */}
							<div className="reply-link">
								{specificApp.reply?.length > 0 ? (
									<h6 onClick={() => setReplyPopup(true)}>
										View all <span>{specificApp.reply?.length}</span> replies
									</h6>
								) : (
									<h6
										style={{
											textDecoration: "none",
											color: "#2a9d8f",
											cursor: "default"
										}}
									>
										No Reply
									</h6>
								)}
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
										value={!replyPopup && replyText}
									/>
									<button className="btn btn-success" onClick={submitHandler}>
										Submit
									</button>
								</div>
							</div>
							{/* reply-box end  */}
						</div>
					</div>
				</div>

				{replyPopup && (
					<ReplyPopup
						setReplyPopup={setReplyPopup}
						currentUser={currentUser}
						specificApp={specificApp}
						replyText={replyText}
						setReplyText={setReplyText}
						submitHandler={submitHandler}
					/>
				)}
			</div>
		</>
	);
};

export default AppointmentDetails;
