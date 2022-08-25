// external components
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "../../../ContextApi";
import DashboardSkeleton from "../../Skeleton/DashboardSkeleton/DashboardSkeleton";
import "./Dashboard.css";

const Dashboard = ({ setSelected, setAppDisplay }) => {
	// for updating dashboard
	const { isSubmitted, currentUser, mySocket, setIsSubmitted } =
		GetContextApi();

	// check fetching complete or not from server
	const [isLoading, setIsLoading] = useState(true);

	// for get all related appointments
	const [getAppointments, setAppointments] = useState("");

	// get current-user's appointment
	const getAllAppointment = async () => {
		try {
			const response = await fetch("/appointment");

			const result = await response.json();

			if (response.status === 200) {
				setAppointments(result);
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
		getAllAppointment();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSubmitted]);

	// for real-time display appointment through socket start
	useEffect(() => {
		if (currentUser.role === "advisor") {
			mySocket?.emit("join_room_appointment", currentUser._id);
			mySocket?.on("receive_appointment", (appointment) => {
				setIsSubmitted(Date.now());
			});
		} else if (currentUser.role === "administrator") {
			mySocket?.emit("join_room_appointment", "administrator");
			mySocket?.on("receive_appointment", (appointment) => {
				setIsSubmitted(Date.now());
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser, mySocket]);
	// for real-time display appointment through socket end

	return (
		<>
			<div className="dashboard-container">
				<div className="row m-0 appointment-container">
					<div className="col-12 p-0 ">
						<div className="appointment-summary">
							<div className="appointment-count" id="total">
								<div className="title">
									<span className="full">Total Appointments</span>
									<span className="short">Total Appt...</span>
								</div>
								<div className="total-number">
									<span className="number">{getAppointments?.length}</span>
									<span className="icon total-icon" id="total-icon">
										<i className="fa-solid fa-list-check"></i>
									</span>
								</div>
							</div>
							<div className="appointment-count" id="solved">
								<div className="title">
									<span className="full">Solved &nbsp;Appointments</span>
									<span className="short">Solved &nbsp;Appt..</span>
								</div>

								<div className="total-number">
									<span className="number">
										{getAppointments &&
											getAppointments.filter(
												(value) => value.status === "solved"
											).length}
									</span>

									<span className="icon total-icon" id="solved-icon">
										<i className="fa-solid fa-circle-check"></i>
									</span>
								</div>
							</div>

							<div className="appointment-count" id="pending">
								<div className="title">
									<span className="full">Pending &nbsp;Appointments</span>
									<span className="short">Pending &nbsp;Appt..</span>
								</div>

								<div className="total-number">
									<span className="number">
										{getAppointments &&
											getAppointments.filter(
												(value) => value.status === "pending"
											).length}
									</span>

									<span className="icon total-icon" id="pending-icon">
										<i className="fa-solid fa-hourglass-half"></i>
									</span>
								</div>
							</div>
							<div className="appointment-count" id="rejected">
								<div className="title">
									<span className="full">Rejected &nbsp;Appointments</span>
									<span className="short">Rejected &nbsp;Appt..</span>
								</div>

								<div className="total-number">
									<span className="number">
										{getAppointments &&
											getAppointments.filter(
												(value) => value.status === "rejected"
											).length}
									</span>

									<span className="icon total-icon" id="rejected-icon">
										<i className="fa-solid fa-circle-xmark"></i>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="row m-0 appointment-container">
					<div className="col-12 p-0">
						<div className="appointment-list">
							<div className="header">
								<h5>Appointment Summary</h5>

								{currentUser?.role === "student" && (
									<button
										type="button"
										className="btn"
										onClick={() => setSelected("appointment")}
									>
										<span>
											<i className="bi bi-plus-circle-dotted"></i> Create
											Appointment
										</span>

										<span title="create a appointment">
											<i className="bi bi-plus-circle-dotted"></i>
										</span>
									</button>
								)}
							</div>
							{isLoading ? (
								<DashboardSkeleton />
							) : (
								<div
									className="table-container"
									data-aos="fade-up"
									data-aos-delay="0"
								>
									<table className="table table-hover">
										<thead>
											<tr>
												<th scope="col">#</th>

												<th scope="col" className="th-full">
													Appt.. Subject
												</th>
												<th scope="col" className="th-short">
													Appt.. Sub...
												</th>

												<th scope="col" className="th-full">
													Appt.. Category
												</th>
												<th scope="col" className="th-short">
													Appt.. Cate...
												</th>

												<th scope="col" className="th-full">
													Appt.. Description
												</th>
												<th scope="col" className="th-short">
													Appt.. Des...
												</th>

												<th scope="col" className="th-full">
													Submitted Date
												</th>
												<th scope="col" className="th-short">
													Sub... Date
												</th>

												<th scope="col">Status</th>
											</tr>
										</thead>
										<tbody>
											{getAppointments &&
												getAppointments
													.map((value, index) => {
														return (
															<tr
																onClick={() => setAppDisplay(value._id)}
																key={index}
															>
																<td
																	id="id"
																	className={
																		currentUser.role === "advisor" &&
																		!value.isRead
																			? "unread"
																			: ""
																	}
																>
																	<span>{index + 1}</span>
																</td>

																<td>
																	<input
																		readOnly
																		value={value.subject}
																		id={
																			currentUser.role === "advisor" &&
																			!value.isRead
																				? "unread"
																				: ""
																		}
																	/>
																</td>

																<td>
																	<input
																		readOnly
																		value={value.category}
																		id={
																			currentUser.role === "advisor" &&
																			!value.isRead
																				? "unread"
																				: ""
																		}
																	/>
																</td>

																<td>
																	<input
																		readOnly
																		value={value.description}
																		id={
																			currentUser.role === "advisor" &&
																			!value.isRead
																				? "unread"
																				: ""
																		}
																	/>
																</td>

																<td>
																	<input
																		readOnly
																		value={moment(value.createdAt).format(
																			"MMMM DD, YYYY"
																		)}
																		id={
																			currentUser.role === "advisor" &&
																			!value.isRead
																				? "unread"
																				: ""
																		}
																	/>
																</td>

																<td id="for-icon">
																	{value.status === "solved" && (
																		<span className="icon" id="solved-icon">
																			<i className="fa-solid fa-circle-check"></i>
																		</span>
																	)}

																	{value.status === "pending" && (
																		<span className="icon" id="pending-icon">
																			<i className="fa-solid fa-hourglass-half"></i>
																		</span>
																	)}

																	{value.status === "rejected" && (
																		<span className="icon" id="rejected-icon">
																			<i className="fa-solid fa-circle-xmark"></i>
																		</span>
																	)}
																</td>
															</tr>
														);
													})
													.reverse()}
										</tbody>
									</table>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
