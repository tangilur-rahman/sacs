// external components
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// internal components
import "./Dashboard.css";

const Dashboard = ({ setSelected, setAppDisplay, isSubmitted }) => {
	const [getAppointments, setAppointments] = useState("");

	// get current-user's appointment
	const getAllAppointment = async () => {
		try {
			const response = await fetch("/appointment");

			const result = await response.json();

			if (response.status === 200) {
				setAppointments(result);
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
	}, [isSubmitted]);

	return (
		<>
			<div className="dashboard-container">
				<div className="row m-0 appointment-container">
					<div className="col-12 p-0 ">
						<div className="appointment-summary">
							<div className="appointment-count">
								<div className="total">
									Total Appointment <span>{getAppointments.length}</span>
								</div>
								<span className="icon" id="total-icon">
									<i className="fa-solid fa-list-check"></i>
								</span>
							</div>
							<div className="appointment-count">
								<div className="solved">
									Solved Appt..
									<span>
										{getAppointments &&
											getAppointments.filter(
												(value) => value.status === "solved"
											).length}
									</span>
								</div>
								<span className="icon" id="solved-icon">
									<i className="fa-solid fa-circle-check"></i>
								</span>
							</div>
							<div className="appointment-count">
								<div className="pending">
									Pending Appt..
									<span>
										{getAppointments &&
											getAppointments.filter(
												(value) => value.status === "pending"
											).length}
									</span>
								</div>
								<span className="icon" id="pending-icon">
									<i className="fa-solid fa-hourglass-half"></i>
								</span>
							</div>
							<div className="appointment-count">
								<div className="rejected">
									Rejected Appt..
									<span>
										{getAppointments &&
											getAppointments.filter(
												(value) => value.status === "rejected"
											).length}
									</span>
								</div>
								<span className="icon" id="rejected-icon">
									<i className="fa-solid fa-circle-xmark"></i>
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className="row m-0 appointment-container">
					<div className="col-12 p-0">
						<div className="appointment-list">
							<div className="header">
								<h5>Appointment Summary</h5>
								<button
									type="button"
									className="btn"
									onClick={() => setSelected("appointment")}
								>
									<i className="bi bi-plus-circle-dotted"></i> Create
									Appointment
								</button>
							</div>
							<div className="table-container">
								<table className="table table-hover">
									<thead>
										<tr>
											<th scope="col">#</th>
											<th scope="col">Appt.. Subject</th>
											<th scope="col">Appt.. Category</th>
											<th scope="col">Appt.. Description</th>
											<th scope="col">Submitted Date</th>
											<th scope="col">Status</th>
										</tr>
									</thead>
									<tbody>
										{getAppointments &&
											getAppointments.map((value, index) => {
												return (
													<tr
														onClick={() => setAppDisplay(value._id)}
														key={index}
													>
														<td id="id">
															<span>{index + 1}</span>
														</td>
														<td>
															<input readOnly value={value.subject} />
														</td>
														<td>
															<input readOnly value={value.category} />
														</td>
														<td>
															<input readOnly value={value.description} />
														</td>
														<td>
															<input
																readOnly
																value={moment(value.createdAt).format(
																	"MMMM DD, YYYY"
																)}
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
											})}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
