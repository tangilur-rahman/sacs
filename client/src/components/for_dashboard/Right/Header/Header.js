import "./Header.css";

const Header = () => {
	return (
		<>
			<div className="header-container">
				<div className="selected-user">
					<img src="/assets/profile/tangil.png" alt="profile-img" />
					<h6>Tangilur Rahman</h6>
				</div>

				<span>
					<i className="fa-solid fa-ellipsis"></i>
				</span>
			</div>
		</>
	);
};

export default Header;
