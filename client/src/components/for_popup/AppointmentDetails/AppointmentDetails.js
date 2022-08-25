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
	const { setIsSubmitted, mySocket, setNotifiUpdate, setNotifiUpdateAdmin } =
		GetContextApi();

	// for loading until fetching not complete
	const [isLoading, setIsLoading] = useState(true);

	// for reply popup toggle
	const [replyPopup, setReplyPopup] = useState(false);

	// for get single appointment
	const [specificApp, setSpecificApp] = useState("");

	// for pick date-time
	const [picDate, setPicDate] = useState(null);

	// for get reply-text & status
	const [replyText, setReplyText] = useState("");
	const [getStatus, setStatus] = useState("");

	// for value change fetching again
	const [checked, setChecked] = useState("");

	// for checking read or unread
	const [isRead, setIsRead] = useState(false);

	// for conform want to delete or not
	const [conformPopup, setConformPopup] = useState(false);

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
				setPicDate(
					result.appointment_date ? new Date(result.appointment_date) : ""
				);
				setIsRead(result.isRead);
				setIsLoading(false);
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
		if (!(picDate || replyText || getStatus !== specificApp?.status)) {
			toast("Nothing have to sumit", {
				position: "top-right",
				theme: "dark",
				autoClose: 2000
			});
		} else {
			// for socket notification start
			if (replyText) {
				if (currentUser.role === "advisor") {
					// for student notification start
					let notificationObject;

					notificationObject = {
						id: specificApp.student._id,
						sender_name: specificApp.advisor.name,
						sender_profile: specificApp.advisor.profile_img,
						kind: "reply",
						text: "send your appt..'s reply.",
						isRead: false,
						time: Date.now(),
						from_where: specificApp._id
					};

					mySocket.emit("send_notification", {
						notificationObject,
						room: specificApp.student._id
					});
					setNotifiUpdate(notificationObject);
					// for student notification end

					// for admin notification start
					notificationObject = {
						id: "administrator",
						sender_name: specificApp.advisor.name,
						sender_profile: specificApp.advisor.profile_img,
						kind: "reply",
						text: `send appt..'s reply to ${specificApp.student.name}.`,
						isRead: false,
						time: Date.now(),
						from_where: specificApp._id
					};

					mySocket.emit("send_notification", {
						notificationObject,
						room: "administrator"
					});
					setNotifiUpdateAdmin(notificationObject);
					// for admin notification end
				} else if (currentUser.role === "student") {
					// for advisor notification start
					let notificationObject;

					notificationObject = {
						id: specificApp.advisor._id,
						sender_name: specificApp.student.name,
						sender_profile: specificApp.student.profile_img,
						kind: "reply",
						text: "send appt..'s reply.",
						isRead: false,
						time: Date.now(),
						from_where: specificApp._id
					};

					mySocket.emit("send_notification", {
						notificationObject,
						room: specificApp.advisor._id
					});
					setNotifiUpdate(notificationObject);
					// for advisor notification end

					// for admin notification start
					notificationObject = {
						id: "administrator",
						sender_name: specificApp.student.name,
						sender_profile: specificApp.student.profile_img,
						kind: "reply",
						text: `send appt..'s reply to ${specificApp.advisor.name}.`,
						isRead: false,
						time: Date.now(),
						from_where: specificApp._id
					};

					mySocket.emit("send_notification", {
						notificationObject,
						room: "administrator"
					});
					setNotifiUpdateAdmin(notificationObject);
					// for admin notification end
				}
			} else if (
				currentUser.role === "advisor" &&
				getStatus !== specificApp.status
			) {
				// student notification start
				let notificationObject;

				notificationObject = {
					id: specificApp.student._id,
					sender_name: specificApp.advisor.name,
					sender_profile: specificApp.advisor.profile_img,
					kind: "status",
					text: "change your appt.. status.",
					isRead: false,
					time: Date.now(),
					from_where: specificApp._id
				};

				mySocket.emit("send_notification", {
					notificationObject,
					room: specificApp.student._id
				});
				setNotifiUpdate(notificationObject);
				// student notification end

				// admin notification start
				notificationObject = {
					id: "administrator",
					sender_name: specificApp.advisor.name,
					sender_profile: specificApp.advisor.profile_img,
					kind: "status",
					text: `change ${specificApp.student.name}'s appt.. status.`,
					isRead: false,
					time: Date.now(),
					from_where: specificApp._id
				};

				mySocket.emit("send_notification", {
					notificationObject,
					room: "administrator"
				});
				setNotifiUpdateAdmin(notificationObject);
				// admin notification end
			} else if (
				currentUser.role === "advisor" &&
				picDate !== specificApp.appointment_date
			) {
				// student notification start
				let notificationObject;
				notificationObject = {
					id: specificApp.student._id,
					sender_name: specificApp.advisor.name,
					sender_profile: specificApp.advisor.profile_img,
					kind: "apptDate",
					text: "choose appointment date.",
					isRead: false,
					time: Date.now(),
					from_where: specificApp._id
				};

				mySocket.emit("send_notification", {
					notificationObject,
					room: specificApp.student._id
				});
				setNotifiUpdate(notificationObject);
				// student notification end

				// admin notification start
				notificationObject = {
					id: "administrator",
					sender_name: specificApp.advisor.name,
					sender_profile: specificApp.advisor.profile_img,
					kind: "apptDate",
					text: `change ${specificApp.student.name}'s appt.. date.`,
					isRead: false,
					time: Date.now(),
					from_where: specificApp._id
				};

				mySocket.emit("send_notification", {
					notificationObject,
					room: "administrator"
				});
				setNotifiUpdateAdmin(notificationObject);
				// admin notification end
			}
			// for socket notification end

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

	// appointment delete handler only admin start
	const appointmentDeleteHandler = async () => {
		if (specificApp) {
			try {
				const response = await fetch(`/appointment/delete/${specificApp._id}`);

				const result = await response.json();

				if (response.status === 200) {
					toast.success(result.message, {
						position: "top-right",
						theme: "colored",
						autoClose: 1500
					});
					setTimeout(() => {
						setAppDisplay(false);
						setIsSubmitted(Date.now());
					}, 2500);
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
	// appointment delete handler admin end

	return (
		<>
			{isLoading ? (
				<div>
					<div className="loading-animation">
						<div className="obj"></div>
						<div className="obj"></div>
						<div className="obj"></div>
						<div className="obj"></div>
						<div className="obj"></div>
						<div className="obj"></div>
						<div className="obj"></div>
						<div className="obj"></div>
					</div>
				</div>
			) : (
				<>
					<div className="appointment-details-container">
						<div className="row m-0 layout-center">
							<div className="col-xxl-9 col-11 p-0">
								<div
									ref={myRef}
									className="appointment-details"
									id={replyPopup ? "appt-blur" : ""}
									data-aos="fade-up"
									data-aos-delay="0"
								>
									{/* header section start  */}
									<div className="header">
										{currentUser.role !== "student" && (
											<div className="user-info" title="Student">
												<img
													src={`uploads/profile-img/${specificApp.student?.profile_img}`}
													alt="profile-img"
													className="profile-img img-fluid"
												/>

												<div className="info">
													<h6>{specificApp.student?.name}</h6>
													<h6>
														Id&nbsp;: &nbsp;
														<span>{specificApp.student?.id}</span>
													</h6>
												</div>
											</div>
										)}

										<div className="subject">
											<h3>{specificApp?.subject}</h3>
										</div>

										{currentUser.role === "administrator" && (
											<div className="user-info" title="Advisor">
												<img
													src={`uploads/profile-img/${specificApp.advisor?.profile_img}`}
													alt="profile-img"
													className="profile-img img-fluid"
												/>

												<div className="info">
													<h6>{specificApp.advisor?.name}</h6>
													<h6>
														Id&nbsp;: &nbsp;
														<span>{specificApp.advisor?.id}</span>
													</h6>
												</div>
											</div>
										)}
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
											<span>Description:</span>
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
																	value.split(".").slice(-1)[0]}
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
									{currentUser.role !== "student" && (
										<>
											<div className="advisor-section">
												<span>Appointment Date &nbsp;:</span>
												<div className="wrapper">
													<div className="app-date">
														<DateTimePicker
															className="date-picker"
															onChange={(date) => setPicDate(date)}
															value={picDate}
															format="dd-MM-y  h:mm a"
														/>
													</div>

													<div className="app-status" id="inside-wrapper">
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
															className={
																getStatus === "pending" ? "active" : ""
															}
															onClick={() => setStatus("pending")}
														>
															<div> Pending Appt..</div>
															<div className="icon-container">
																<i className="fa-solid fa-hourglass-half"></i>
															</div>
														</div>

														<div
															id="rejected"
															className={
																getStatus === "rejected" ? "active" : ""
															}
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

											<div id="outside-advisor">
												<span>Status :</span>
												<div className="wrapper">
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
										</>
									)}
									{/* advisor-section end  */}

									{/* reply-link start  */}
									<div className="reply-link">
										{specificApp.reply?.length > 0 ? (
											<h6 onClick={() => setReplyPopup(true)}>
												View all <span>{specificApp.reply?.length}</span>{" "}
												replies
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
									{currentUser.role !== "administrator" && (
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
												<button
													className="btn btn-success"
													onClick={submitHandler}
												>
													Submit
												</button>
											</div>
										</div>
									)}

									{/* reply-box end  */}

									{/* delete control section start  */}
									{currentUser.role === "administrator" && (
										<div className="delete-controller">
											<button
												className="btn btn-danger"
												onClick={() => setConformPopup(!conformPopup)}
											>
												Delete
											</button>

											<button
												className="btn btn-dark"
												onClick={() => setAppDisplay(false)}
											>
												Cancel
											</button>
										</div>
									)}

									{/* for popup model section start  */}
									{conformPopup && (
										<div
											className="conformation-popup"
											data-aos="fade-down"
											data-aos-delay="0"
										>
											<h5>Do you want to delete that appointment?</h5>
											<div className="delete-controller">
												<button
													className="btn btn-dark"
													onClick={() => {
														setConformPopup(!conformPopup);
													}}
												>
													Cancel
												</button>

												<button
													className="btn btn-danger"
													onClick={appointmentDeleteHandler}
												>
													Submit
												</button>
											</div>
										</div>
									)}
									{/* for popup model section end  */}

									{/* delete control section end  */}

									{/* for close icon start */}
									<span className="icon" onClick={() => setAppDisplay(false)}>
										<i className="fa-solid fa-circle-xmark"></i>
									</span>
									{/* for close icon end */}
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
			)}
		</>
	);
};

export default AppointmentDetails;
