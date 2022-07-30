// external components

// internal components
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
								<span className="icon">
									<i className="fa-solid fa-list-check"></i>
								</span>
							</div>
							<div className="appointment-count">
								<div className="solved">
									Solved Appt..<span>12</span>
								</div>
								<span className="icon">
									<i className="fa-solid fa-circle-check"></i>
								</span>
							</div>
							<div className="appointment-count">
								<div className="pending">
									Pending Appt..<span>14</span>
								</div>
								<span className="icon">
									<i className="fa-solid fa-hourglass-half"></i>
								</span>
							</div>
							<div className="appointment-count">
								<div className="rejected">
									Rejected Appt..<span>18</span>
								</div>
								<span className="icon">
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
							<table className="table table-hover">
								<thead>
									<tr className="layout">
										<th scope="col">#</th>
										<th scope="col">Appt.. Subject</th>
										<th scope="col">Appt.. Category</th>
										<th scope="col">Appt.. Description</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th scope="row">1</th>
										<td>Mark</td>
										<td>Otto</td>
										<td>@mdo</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
