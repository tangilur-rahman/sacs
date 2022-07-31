import "./InstructorInfo.css";

const InstructorInfo = () => {
	return (
		<>
			<div className="instructor-container">
				<div className="row">
					<div className="col-5 instructor-img">
						<img
							src="/assets/profile/developer-2.png"
							alt="profile-img"
							className="img-fluid"
						/>
					</div>
					<div className="col-6 instructor-info">
						<div className="outer">
							<div className="inner"></div>
						</div>
						<div className="info">
							<h5>
								Name : <span> Tangilur Rahman</span>
							</h5>
							<h5>
								Email : <span>mohammad@gmail.com</span>
							</h5>
							<h5>
								Phone : <span>0171111111</span>
							</h5>
							<h5>
								Department : <span>CSE</span>
							</h5>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default InstructorInfo;
