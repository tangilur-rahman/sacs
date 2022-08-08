import "./Header.css";

const Header = ({ getMessages }) => {
	return (
		<>
			<div className="header-container">
				<div className="selected-user">
					<img
						src={`/uploads/profile-img/${getMessages.chat_img}`}
						alt="profile-img"
						className="img-fluid"
					/>
					<h6>{getMessages.chat_name}</h6>
				</div>

				<span>
					<i className="fa-solid fa-ellipsis"></i>
				</span>
			</div>
		</>
	);
};

export default Header;
