// external components
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

// internal components
import "./ProfileEdit.css";

const ProfileEdit = ({ profileT, setProfileT, currentUser }) => {
	// for toggle edit option
	const [editT, setEditT] = useState(false);

	const [file, setFile] = useState("");
	const [cpassword, setCpassword] = useState("");
	const [newPassword, setNewPassword] = useState("");

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

	// submit handler
	const submitHandler = async (event) => {
		event.preventDefault();

		const formData = new FormData();

		formData.append("file", file);

		// for update password start
		try {
			const response = await fetch("/profile/update", {
				method: "PUT",
				body: JSON.stringify({
					cpassword,
					newPassword
				}),
				headers: { "Content-Type": "application/json" }
			});

			const result = await response.json();

			if (response.status === 200) {
				toast.success(result.message, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
				setCpassword("");
				setNewPassword("");
				setEditT(false);
			} else if (response.status === 400) {
				toast(result.message, {
					position: "top-right",
					theme: "dark",
					autoClose: 3000
				});
			} else {
				toast.error(result.message, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
			}
		} catch (error) {
			toast.error(error.message, {
				position: "top-right",
				theme: "colored",
				autoClose: 3000
			});
		}

		// for update password end

		// for upload profile-img start
		if (file) {
			try {
				const response = await fetch("/profile/upload", {
					method: "POST",
					body: formData,
					headers: { "Content-Type": "multipart/form-data" }
				});

				const result = await response.json();

				if (result.message) {
					toast.success(result.message);
				} else {
					toast.warn(result.error);
				}
			} catch (error) {
				toast.error(error.message);
			}
		}

		// for upload profile-img end
	};

	return (
		<>
			<div className="profile-edit-container">
				<div className="row m-0 layout">
					<div className="col-9 p-0">
						<div ref={myRef} className="wrapper">
							<div className="curr-user-profile">
								<span className="img-wrapper">
									<img
										src={currentUser.profile_img}
										alt="profile-img"
										className={editT ? "img-fluid" : "img-fluid animation"}
									/>

									{editT && (
										<span className="change-img">
											<label htmlFor="change-img">
												<i className="fa-solid fa-camera"></i>
											</label>
										</span>
									)}
								</span>
							</div>
							<div className="curr-user-info">
								<div className="row info">
									<span id="name">
										name : <input value={currentUser.name} readOnly />
									</span>

									<span>
										ID : <input value={currentUser.id} readOnly />
									</span>

									<span id="email">
										Email : <input value={currentUser.email} readOnly />
									</span>

									<span>
										Department :
										<input value={currentUser.department} readOnly />
									</span>

									<span>
										Semester : <input value={currentUser.semester} readOnly />
									</span>

									<span>
										Group : <input value={currentUser.group} readOnly />
									</span>

									<span>
										Year : <input value={currentUser.year} readOnly />
									</span>

									{editT && (
										<span id="current-p">
											<label htmlFor="current_p">Current Password :</label>

											<input
												type="password"
												name="current_p"
												id="current_p"
												autoFocus
												onChange={(event) => setCpassword(event.target.value)}
											/>
										</span>
									)}

									{editT && (
										<div className="last-field">
											<span id="new-p">
												<label htmlFor="new_p">New Password :</label>

												<input
													type="password"
													name="new_p"
													id="new_p"
													onChange={(event) =>
														setNewPassword(event.target.value)
													}
												/>
											</span>
											<div className="profile-btn">
												<button
													type="submit"
													className="btn btn-success"
													onClick={submitHandler}
												>
													Submit
												</button>
											</div>
										</div>
									)}
								</div>
							</div>

							<div className="icon">
								<span onClick={() => setEditT(!editT)}>
									<i className="fa-solid fa-user-pen"></i>
								</span>

								<span onClick={() => setProfileT(false)}>
									<i className="fa-solid fa-circle-xmark"></i>
								</span>
							</div>
						</div>
					</div>
				</div>
				<input
					type="file"
					name="profile-img"
					id="change-img"
					accept="image/png, image/gif, image/jpeg"
					onChange={(event) => setFile(event.target.files[0])}
					style={{ display: "none" }}
				/>
			</div>
		</>
	);
};

export default ProfileEdit;
