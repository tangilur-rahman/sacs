// external components

// internal components
import AppointmentDetails from "./AppointmentDetails/AppointmentDetails";
import "./Dashboard.css";

const Dashboard = ({ setSelected }) => {
	return (
		<>
			<div className="dashboard-container">
				<div className="row m-0 appointment-container">
					<div className="col-12 p-0 ">
						<div className="appointment-summary">
							<div className="appointment-count">
								<div className="total">
									Total Appointment <span>100</span>
								</div>
								<span className="icon" id="total-icon">
									<i className="fa-solid fa-list-check"></i>
								</span>
							</div>
							<div className="appointment-count">
								<div className="solved">
									Solved Appt..<span>12</span>
								</div>
								<span className="icon" id="solved-icon">
									<i className="fa-solid fa-circle-check"></i>
								</span>
							</div>
							<div className="appointment-count">
								<div className="pending">
									Pending Appt..<span>14</span>
								</div>
								<span className="icon" id="pending-icon">
									<i className="fa-solid fa-hourglass-half"></i>
								</span>
							</div>
							<div className="appointment-count">
								<div className="rejected">
									Rejected Appt..<span>18</span>
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
									class="btn"
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
										<tr>
											<td id="id">
												<span>1</span>
											</td>
											<td>
												<input
													type="text"
													readonly
													value={"application for tuition fee"}
												/>
											</td>
											<td>
												<input type="text" readonly value={"Tuition Fee"} />
											</td>
											<td>
												<input
													type="text"
													readonly
													value={
														"Due to the widespread use of <table> elements across third-party widgets like calendars and date pickers"
													}
												/>
											</td>
											<td>
												<input type="text" readonly value={"12-2-2022"} />
											</td>
											<td id="for-icon">
												<span className="icon" id="solved-icon">
													<i className="fa-solid fa-circle-check"></i>
												</span>

												{/* <span className="icon" id="pending-icon">
													<i className="fa-solid fa-hourglass-half"></i>
												</span>

												<span className="icon" id="rejected-icon">
													<i className="fa-solid fa-circle-xmark"></i>
												</span> */}
											</td>
										</tr>
										<AppointmentDetails />
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
