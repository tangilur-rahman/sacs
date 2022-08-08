// external components
import { useEffect, useRef, useState } from "react";
import NotificationBadge, { Effect } from "react-notification-badge";

// internal components
import { GetContextApi } from "../../ContextApi";
import "./Navbar.css";

const Navbar = ({
	currentUser,
	registerT,
	setRegisterT,
	setTotalT,
	setProfileT
}) => {
	// for get appointment notification value
	const { appNotification } = GetContextApi();

	// for profile & log-out dropdown
	const [dropdownT, setDropdownT] = useState(false);

	// for close from outside-click start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setDropdownT(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// for close from outside-click end

	return (
		<>
			<div className="container-fluid navbar-main-container">
				<div className="row col-11 navbar-container">
					<div className="col-2 p-0">
						<div className="left">
							<img
								src="/assets/logo/university-logo.png"
								alt="logo"
								className="img-fluid"
							/>
							<h2>SACS</h2>
						</div>
					</div>

					<div className="col-7 p-0">
						{currentUser.role === "Administrator" && (
							<div className="middle">
								<div
									className="total"
									onClick={() => setTotalT("List Of Instructors")}
								>
									Total Instructors : &nbsp; <span>10</span>
								</div>

								<div
									className="total"
									onClick={() => setTotalT("List Of Students")}
								>
									Total Students : &nbsp; <span>100</span>
								</div>
							</div>
						)}
					</div>

					<div className="col-3 p-0">
						<div className="right">
							<div className="icon-style">
								{currentUser.role === "administrator" && (
									<span onClick={() => setRegisterT(!registerT)}>
										<i className="bi bi-plus-circle-dotted"></i>
									</span>
								)}

								<span>
									<i className="bi bi-chat-heart"></i>
								</span>

								<span>
									<i className="bi bi-bell-fill">
										{currentUser.role === "advisor" && (
											<NotificationBadge
												count={appNotification.toString()}
												effect={Effect.SCALE}
												className="notification-layout"
											/>
										)}
									</i>
								</span>
							</div>

							<span className="nav-profile">
								<img
									src={`uploads/profile-img/${currentUser.profile_img}`}
									alt="profile img"
									className="profile-img img-fluid"
									onClick={() => setDropdownT(!dropdownT)}
								/>
								{dropdownT && (
									<ul ref={myRef}>
										<li
											onClick={() => {
												setProfileT("profile");
												setDropdownT(false);
											}}
										>
											<i className="bi bi-person-circle"></i>
											<span>My Profile</span>
										</li>
										<li
											onClick={() => {
												setProfileT("logout");
												setDropdownT(false);
											}}
										>
											<i className="fa-solid fa-right-from-bracket"></i>
											<span>Log out</span>
										</li>
									</ul>
								)}
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
