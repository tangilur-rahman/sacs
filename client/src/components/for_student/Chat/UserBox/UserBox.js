// external components
import { useEffect, useRef } from "react";
import sortArray from "sort-array";
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
	setLatestPersonal,
	search,
	setSearch,
	searchUser,
	setSearchUser,
	setSelectedSearch
}) => {
	// get current user
	const { currentUser } = GetContextApi();

	// insert initial latest message & time
	useEffect(() => {
		setLatestGroup(getGroup?.messages.slice(-1)[0]);

		if (currentUser.role === "student") {
			setLatestPersonal(getPersonal?.messages.slice(-1)[0]);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// for close search-box start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setSearchUser("");
			setSearch("");
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// for close search-box end

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
							onChange={(event) => setSearch(event.target.value)}
							value={search}
						/>
					</div>
				)}

				<div
					className="user-content"
					id={currentUser.role === "student" ? "student" : ""}
				>
					{/* for group-chat start  */}
					<div className="user" onClick={() => setMessages(getGroup)}>
						<img
							src={`/uploads/profile-img/${getGroup?.chat_img}`}
							alt="profile-img"
							className="profile-img img-fluid"
						/>

						<section>
							<div className="above">
								<h6>
									Department&nbsp;
									<div
										style={{
											textTransform: "uppercase",
											display: "inline-block"
										}}
									>
										{getGroup?.chat_name}
									</div>
								</h6>
								<span>
									{latestGroup?.time && (
										<TimeAgo datetime={latestGroup?.time} />
									)}
								</span>
							</div>

							<div className="down">{latestGroup?.message}</div>
						</section>
					</div>
					{/* for group-chat end  */}

					{/* for personal-chat start  */}
					{/* when student start  */}
					{currentUser.role === "student" && (
						<div className="user" onClick={() => setMessages(getPersonal)}>
							<img
								src={`/uploads/profile-img/${getPersonal.advisor?.profile_img}`}
								alt="profile-img"
								className="profile-img img-fluid"
							/>

							<section>
								<div className="above">
									<h6>{getPersonal.advisor?.name}</h6>

									<span>
										{latestPersonal?.time && (
											<TimeAgo datetime={latestPersonal?.time} />
										)}
									</span>
								</div>

								<div className="down">{latestPersonal?.message}</div>
							</section>
						</div>
					)}
					{/* when student end  */}

					{/* when advisor start */}
					{currentUser.role !== "student" &&
						sortArray(getPersonal, {
							by: "updatedAt",
							order: "desc"
						})?.map((value, index) => {
							return (
								<div
									className="user"
									onClick={() => setMessages(value)}
									key={index}
								>
									<img
										src={`/uploads/profile-img/${value.student?.profile_img}`}
										alt="profile-img"
										className="profile-img img-fluid"
									/>

									<section>
										<div className="above">
											<h6>{value.student?.name}</h6>

											<span>
												{value?.messages.slice(-1)[0]?.time && (
													<TimeAgo
														datetime={value?.messages.slice(-1)[0]?.time}
													/>
												)}
											</span>
										</div>

										<div className="down">
											{value?.messages.slice(-1)[0]?.message}
										</div>
									</section>
								</div>
							);
						})}

					{/* when advisor end */}
					{/* for personal-chat end  */}

					{/* for search students start  */}
					<div id="search-box" ref={myRef}>
						{searchUser &&
							searchUser.map((value, index) => {
								return (
									<div
										className="user"
										key={index}
										onClick={() => {
											setSelectedSearch(value);
											setSearch("");
										}}
									>
										<img
											src={`/uploads/profile-img/${value?.profile_img}`}
											alt="profile-img"
											className="profile-img img-fluid"
										/>

										<section>
											<div className="above">
												<h6>{value?.name}</h6>
											</div>
										</section>
									</div>
								);
							})}
					</div>

					{/* for search students end  */}
				</div>
			</div>
		</>
	);
};

export default UserBox;
