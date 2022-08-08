// external components

// internal components
import "./UserBox.css";

const UserBox = ({ getGroup, setMessages }) => {
	return (
		<>
			<div className="user-box">
				<div className="search">
					<i className="bi bi-search-heart"></i>
					<input
						type="search"
						name="search"
						id="search"
						autoComplete="off"
						placeholder="Search or start new chat"
					/>
				</div>
				<div className="user" onClick={() => setMessages(getGroup)}>
					<img
						src={`/uploads/profile-img/${getGroup.chat_img}`}
						alt="profile-img"
						className="profile-img img-fluid"
					/>

					<section>
						<div className="above">
							<h6>{getGroup.chat_name}</h6>
							<span>
								{getGroup.messages > 0
									? getGroup.messages.slice(-1)[0].time
									: ""}
							</span>
						</div>

						<div className="down">
							{getGroup.messages > 0
								? getGroup.messages.slice(-1)[0].message
								: ""}
						</div>
					</section>
				</div>
			</div>
		</>
	);
};

export default UserBox;
