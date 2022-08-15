// external components
import { useEffect, useRef, useState } from "react";
import NotificationBadge, { Effect } from "react-notification-badge";
import { toast } from "react-toastify";
import sortArray from "sort-array";
import TimeAgo from "timeago-react";

// internal components
import { GetContextApi } from "../../ContextApi";
import "./Navbar.css";

const Navbar = ({
	currentUser,
	registerT,
	setRegisterT,
	setTotalT,
	setProfileT,
	selected
}) => {
	// for get socket connection
	const { mySocket, notifiUpdate } = GetContextApi();

	// for get all notifications
	const [notifications, setNotifications] = useState("");
	const [messageN, setMessageN] = useState("");
	const [appointmentN, setAppointmentN] = useState("");

	// for update appointment notification count
	const [checked, setChecked] = useState(false);

	// for get socket notification
	const [socketN, setSocketN] = useState("");

	// for profile & log-out dropdown
	const [logoutT, setLogoutT] = useState(false);

	// for notification dropdown
	const [appointmentN_T, setAppointmentN_T] = useState("");
	const [messageN_T, setMessageN_T] = useState("");

	// for close message dropdown from outside-click start
	const messageRef = useRef();

	const handleClickOutsideMessage = (e) => {
		if (!messageRef.current?.contains(e.target)) {
			setMessageN_T(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutsideMessage);
		return () =>
			document.removeEventListener("mousedown", handleClickOutsideMessage);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// for close message dropdown from outside-click end

	// for close appointment dropdown from outside-click start
	const appointmentRef = useRef();

	const handleClickOutsideAppt = (e) => {
		if (!appointmentRef.current?.contains(e.target)) {
			setAppointmentN_T(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutsideAppt);
		return () =>
			document.removeEventListener("mousedown", handleClickOutsideAppt);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// for close appointment dropdown from outside-click end

	// for close profile dropdown from outside-click start
	const profileRef = useRef();

	const handleClickOutside = (e) => {
		if (!profileRef.current?.contains(e.target)) {
			setLogoutT(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// for close profile dropdown from outside-click end

	// get currentUser all notifications start
	useEffect(() => {
		(async () => {
			try {
				const response = await fetch("/notification");

				const result = await response.json();

				if (response.status === 200) {
					setNotifications(result ? result.notification : []);
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [checked]);
	// get currentUser all notifications end

	// for get notification through socket start
	useEffect(() => {
		mySocket?.emit("join_room_notification", currentUser._id);
		mySocket?.on("receive_notification", (notification) => {
			setSocketN(notification);
		});
	}, [mySocket, currentUser]);
	// for get notification through socket end

	useEffect(() => {
		if (socketN) {
			setNotifications([...notifications, socketN]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socketN]);

	// initialize notification start
	useEffect(() => {
		if (notifications) {
			setMessageN(notifications?.filter((value) => value.kind === "message"));

			if (currentUser.role === "advisor") {
				setAppointmentN(
					notifications?.filter(
						(value) => value.kind === "create" || value.kind === "reply"
					)
				);
			} else if (currentUser.role === "student") {
				setAppointmentN(
					notifications?.filter(
						(value) =>
							value.kind === "apptDate" ||
							value.kind === "status" ||
							value.kind === "reply"
					)
				);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [notifications, currentUser]);
	// initialize notification end

	// for notification update start
	useEffect(() => {
		(async () => {
			if (typeof notifiUpdate === "object") {
				try {
					const response = await fetch("/notification", {
						method: "PUT",
						body: JSON.stringify(notifiUpdate),
						headers: { "Content-Type": "application/json" }
					});

					const result = await response.json();

					if (response.status === 200) {
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
			} else {
				return;
			}
		})();
	}, [notifiUpdate]);
	// for notification update end

	// make all read handler start
	const makeAllReadHandler = async () => {
		try {
			const response = await fetch("/notification/read");

			const result = await response.json();

			if (response.status === 200) {
				setChecked(Date.now());
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
	};

	useEffect(() => {
		if (selected === "chat") {
			makeAllReadHandler();
		}
	}, [selected]);
	// make all read handler end

	return (
		<>
			<div className="container-fluid navbar-main-container">
				<div className="row col-11 navbar-container">
					<div className="col-2 p-0">
						<div className="left">
							<img
								src="/assets/logo/sacs-logo.png"
								alt="logo"
								className="img-fluid"
							/>
							<h2>SACS</h2>
						</div>
					</div>

					<div className="col-7 p-0">
						{currentUser.role === "Administrator" && (
							<div className="middle">
								<div
									className="total"
									onClick={() => setTotalT("List Of Instructors")}
								>
									Total Instructors : &nbsp; <span>10</span>
								</div>

								<div
									className="total"
									onClick={() => setTotalT("List Of Students")}
								>
									Total Students : &nbsp; <span>100</span>
								</div>
							</div>
						)}
					</div>

					<div className="col-3 p-0">
						<div className="right">
							<div className="icon-style">
								{currentUser.role === "administrator" && (
									<span onClick={() => setRegisterT(!registerT)}>
										<i className="bi bi-plus-circle-dotted"></i>
									</span>
								)}

								<span>
									<i
										className="bi bi-chat-heart"
										onClick={() => {
											setMessageN_T(!messageN_T);
											makeAllReadHandler();
										}}
									>
										<NotificationBadge
											count={
												selected !== "chat" &&
												messageN &&
												messageN.filter((value) => value.isRead === false)
													?.length
											}
											effect={Effect.SCALE}
											className="notification-count"
										/>
									</i>

									{/* for message notification  */}
									{messageN_T && messageN.length > 0 ? (
										<div ref={messageRef} className="notification-container">
											{sortArray(messageN, {
												by: "time",
												order: "desc"
											}).map((value, index) => {
												return (
													<div className="notification-display" key={index}>
														<img
															src={`uploads/profile-img/${value.sender_profile}`}
															alt="img"
															className="profile-img img-fluid"
														/>

														<div className="last-message">
															<span>{value.sender_name}</span>

															<h6
																style={{ wordSpacing: "0", textAlign: "start" }}
															>
																{value.last_message}
															</h6>
														</div>
														<div className="notification-time">
															<TimeAgo datetime={value.time} />
														</div>
													</div>
												);
											})}
										</div>
									) : (
										messageN_T && (
											<div className="no-notification">
												<h6>No Message</h6>
											</div>
										)
									)}
								</span>

								<span>
									<i
										className="bi bi-bell-fill"
										onClick={() => {
											setAppointmentN_T(!appointmentN_T);
											makeAllReadHandler();
										}}
									>
										<NotificationBadge
											count={
												appointmentN &&
												appointmentN.filter((value) => value.isRead === false)
													?.length
											}
											effect={Effect.SCALE}
											className="notification-count"
										/>
									</i>

									{/* for appointment notification start */}
									{appointmentN_T && appointmentN.length > 0 ? (
										<div
											ref={appointmentRef}
											className="notification-container"
										>
											{sortArray(appointmentN, {
												by: "time",
												order: "desc"
											}).map((value, index) => {
												return (
													<div className="notification-display" key={index}>
														<img
															src={`uploads/profile-img/${value.sender_profile}`}
															alt="img"
															className="profile-img img-fluid"
														/>

														<div>
															<h6>{value.sender_name}</h6> {value.text}
														</div>
														<div className="notification-time">
															<TimeAgo datetime={value.time} />
														</div>
													</div>
												);
											})}
										</div>
									) : (
										appointmentN_T && (
											<div className="no-notification">
												<h6>Empty Notification</h6>
											</div>
										)
									)}
									{/* for appointment notification end */}
								</span>
							</div>

							<span className="nav-profile">
								<img
									src={`uploads/profile-img/${currentUser.profile_img}`}
									alt="profile img"
									className="profile-img img-fluid"
									onClick={() => setLogoutT(!logoutT)}
								/>
								{logoutT && (
									<ul ref={profileRef}>
										<li
											onClick={() => {
												setProfileT("profile");
												setLogoutT(false);
											}}
										>
											<i className="bi bi-person-circle"></i>
											<span>My Profile</span>
										</li>
										<li
											onClick={() => {
												setProfileT("logout");
												setLogoutT(false);
											}}
										>
											<i className="fa-solid fa-right-from-bracket"></i>
											<span>Log out</span>
										</li>
									</ul>
								)}
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
