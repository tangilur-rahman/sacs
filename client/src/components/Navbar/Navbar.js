import "./Navbar.css";

const Navbar = () => {
	return (
		<>
			<div className="container-fluid navbar-main-container">
				<div className="row col-11 navbar-container">
					<div className="col-2 p-0">
						<div className="left">
							<img src="/assets/logo/university-logo.png" alt="logo" />
							<h2>SACS</h2>
						</div>
					</div>

					<div className="col-7 p-0">
						<div className="middle">
							<div className="total">
								Total Instructors : &nbsp; <span>10</span>
							</div>

							<div className="total">
								Total Students : &nbsp; <span>100</span>
							</div>
						</div>
					</div>

					<div className="col-3 p-0">
						<div className="right">
							<div className="icon-style">
								<span>
									<i className="bi bi-plus-circle-dotted"></i>
								</span>

								<span>
									<i className="bi bi-chat-heart"></i>
								</span>

								<span>
									<i className="bi bi-bell-fill"></i>
								</span>
							</div>

							<img
								src="/assets/profile/tangil.png"
								alt="profile img"
								className="profile-img"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
