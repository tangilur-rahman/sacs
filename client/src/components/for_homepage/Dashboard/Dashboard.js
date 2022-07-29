import "./Dashboard.css";

const Dashboard = () => {
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
					<div className="col-11 p-0">
						<div className="appointment-list">
							<div className="">list of dashboard</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
