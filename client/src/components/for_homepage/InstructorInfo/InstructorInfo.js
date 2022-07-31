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
							<span>
								Name : <input value={"Shakib Al Hassan"} readOnly />
							</span>
							<span>
								Email : <input value={"mohammadtangilur@gmail.com"} readOnly />
							</span>
							<span>
								Phone : <input value={"01711111"} readOnly />
							</span>
							<span>
								Department : <input value={"CSE"} readOnly />
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default InstructorInfo;
