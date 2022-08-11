// external components
import { useEffect } from "react";
import TimeAgo from "timeago-react";
import { GetContextApi } from "../../../../ContextApi";

// internal components
import "./UserBox.css";

const UserBox = ({
	getGroup,
	getPersonal,
	setMessages,
	latestGroup,
	setLatestGroup,
	latestPersonal,
	setLatestPersonal
}) => {
	// get current user
	const { currentUser } = GetContextApi();

	// insert initial latest message & time
	useEffect(() => {
		setLatestGroup(getGroup?.messages.slice(-1)[0]);
		setLatestPersonal(getPersonal?.messages.slice(-1)[0]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className="user-box">
				{currentUser.role !== "student" && (
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
				)}

				{/* for group-chat start  */}
				<div className="user" onClick={() => setMessages(getGroup)}>
					<img
						src={`/uploads/profile-img/${getGroup?.chat_img}`}
						alt="profile-img"
						className="profile-img img-fluid"
					/>

					<section>
						<div className="above">
							<h6>{getGroup?.chat_name}</h6>
							<span>
								<TimeAgo datetime={latestGroup?.time} />
							</span>
						</div>

						<div className="down">{latestGroup?.message}</div>
					</section>
				</div>
				{/* for group-chat end  */}

				{/* for personal-chat start  */}
				<div className="user" onClick={() => setMessages(getPersonal)}>
					{currentUser &&
						(currentUser.role === "advisor" ? (
							<img
								src={`/uploads/profile-img/${getPersonal.student?.profile_img}`}
								alt="profile-img"
								className="profile-img img-fluid"
							/>
						) : (
							<img
								src={`/uploads/profile-img/${getPersonal.advisor?.profile_img}`}
								alt="profile-img"
								className="profile-img img-fluid"
							/>
						))}

					<section>
						<div className="above">
							{currentUser &&
								(currentUser.role === "advisor" ? (
									<h6>{getPersonal.student?.name}</h6>
								) : (
									<h6>{getPersonal.advisor?.name}</h6>
								))}

							<span>
								<TimeAgo datetime={latestPersonal?.time} />
							</span>
						</div>

						<div className="down">{latestPersonal?.message}</div>
					</section>
				</div>
				{/* for personal-chat end  */}
			</div>
		</>
	);
};

export default UserBox;
