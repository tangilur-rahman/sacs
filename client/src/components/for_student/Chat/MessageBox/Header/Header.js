// internal components
import { GetContextApi } from "../../../../../ContextApi";
import "./Header.css";

const Header = ({ getMessages }) => {
	// get current user
	const { currentUser } = GetContextApi();

	return (
		<>
			<div className="header-container">
				<div className="selected-user">
					{/* header img start  */}
					{getMessages.room ===
					`${currentUser?.department}-${currentUser?.semester}-${currentUser?.year}` ? (
						<img
							src={`/uploads/profile-img/${getMessages.chat_img}`}
							alt="profile-img"
							className="img-fluid"
						/>
					) : currentUser.role === "advisor" ? (
						<img
							src={`/uploads/profile-img/${getMessages.student.profile_img}`}
							alt="profile-img"
							className="img-fluid"
						/>
					) : (
						<img
							src={`/uploads/profile-img/${getMessages.advisor.profile_img}`}
							alt="profile-img"
							className="img-fluid"
						/>
					)}
					{/* header img end  */}

					{/* header name start  */}
					{getMessages.room ===
					`${currentUser?.department}-${currentUser?.semester}-${currentUser?.year}` ? (
						<h6>
							Department Of&nbsp;
							<div
								style={{
									textTransform: "uppercase",
									display: "inline-block"
								}}
							>
								{getMessages?.chat_name}
							</div>
						</h6>
					) : currentUser.role === "advisor" ? (
						<h6>{getMessages.student.name}</h6>
					) : (
						<h6>{getMessages.advisor.name}</h6>
					)}
					{/* header name end  */}
				</div>

				<span>
					<i className="fa-solid fa-ellipsis"></i>
				</span>
			</div>
		</>
	);
};

export default Header;
