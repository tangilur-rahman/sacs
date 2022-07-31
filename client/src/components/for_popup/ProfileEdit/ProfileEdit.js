// external components
import { useEffect, useRef } from "react";

// internal components
import "./ProfileEdit.css";

const ProfileEdit = ({ profileT, setProfileT }) => {
	// for close when clicked outside start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setProfileT(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [profileT]);
	// for close when clicked outside start

	return (
		<>
			<div className="profile-edit-container">
				<div className="row m-0 layout">
					<div className="col-9 p-0">
						<div ref={myRef} className="wrapper">
							<div className="curr-user-profile">
								<span className="img-wrapper">
									<img
										src="/assets/profile/tangil.png"
										alt="profile-img"
										className="img-fluid"
									/>
									<span className="change-img">
										<label htmlFor="change-img">
											<i className="fa-solid fa-camera"></i>
										</label>
									</span>
								</span>
							</div>
							<div className="curr-user-info">
								<div className="row info">
									<span>
										name : <input value={"Tangilur Rahman"} readOnly />
									</span>

									<span>
										ID : <input value={"13323232"} readOnly />
									</span>

									<span id="email">
										Email : <input value={"mohammad@gmail.com"} readOnly />
									</span>

									<span>
										Department : <input value={"CSE"} readOnly />
									</span>

									<span>
										Semester : <input value={"11th"} readOnly />
									</span>

									<span>
										Group : <input value={"A"} readOnly />
									</span>

									<span>
										Year : <input value={"B"} readOnly />
									</span>

									<span id="current-p">
										Current Password :{" "}
										<input type="password" name="current_p" />
									</span>

									<div className="last-field">
										<span id="new-p">
											New Password : <input type="password" name="new_p" />
										</span>
										<div className="profile-btn">
											<button class="btn btn-success">Submit</button>
										</div>
									</div>
								</div>
							</div>

							<div className="icon">
								<span>
									<i className="fa-solid fa-user-pen"></i>
								</span>

								<span>
									<i className="fa-solid fa-circle-xmark"></i>
								</span>
							</div>
						</div>
					</div>
				</div>
				<input
					type="file"
					name="file"
					id="change-img"
					accept="image/png, image/gif, image/jpeg"
					style={{ display: "none" }}
				/>
			</div>
		</>
	);
};

export default ProfileEdit;
