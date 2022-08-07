// external components
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "../../../ContextApi";
import CngProfileImg from "./CngProfileImg/CngProfileImg";
import "./ProfileEdit.css";

const ProfileEdit = ({ setProfileT, currentUser }) => {
	// for updating dashboard
	const { setIsSubmitted } = GetContextApi();

	// for toggle edit option
	const [editT, setEditT] = useState(false);
	const [changeProfileT, setChangeProfileT] = useState(false);

	// for file handle
	const [getFile, setFile] = useState("");
	const [previewImg, setPreviewImg] = useState(
		`uploads/profile-img/${currentUser.profile_img}`
	);

	// for get input-field's value
	const [cpassword, setCpassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [getPhone, setPhone] = useState("");

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
	}, []);
	// for close when clicked outside start

	// for preview
	const imgHandler = (event) => {
		setFile(event.target.files[0]);
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.readyState === 2) {
				setPreviewImg(reader.result);
			}
		};
		reader.readAsDataURL(event.target.files[0]);
	};

	// submit handler
	const submitHandler = async () => {
		try {
			const response = await fetch("/profile/update", {
				method: "PUT",
				body: JSON.stringify({
					cpassword,
					newPassword,
					getPhone
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
				setIsSubmitted(Date.now());
				setCpassword("");
				setNewPassword("");
				setEditT(false);
			} else if (response.status === 400) {
				toast(result.message, {
					position: "top-right",
					theme: "dark",
					autoClose: 3000
				});
			} else if (result.error) {
				toast.error(result.error, {
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
	};

	const displayValue = () => {
		if (editT) {
			return getPhone;
		} else if (currentUser.phone) {
			return "+88 " + currentUser.phone;
		} else {
			return "null";
		}
	};

	return (
		<>
			<div className="profile-edit-container">
				<div className="row m-0 layout">
					<div className="col-9 p-0">
						<div
							ref={myRef}
							className="wrapper"
							id={changeProfileT ? "blur" : null}
						>
							<div className="curr-user-profile">
								<span className="img-wrapper">
									<img
										src={`uploads/profile-img/${currentUser.profile_img}`}
										alt="profile-img"
										className={editT ? "img-fluid" : "img-fluid animation"}
									/>

									{editT && (
										<span
											className="change-img"
											onClick={() => setChangeProfileT(!changeProfileT)}
										>
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
										Name : <input value={currentUser.name} readOnly />
									</span>

									<span>
										ID : <input value={currentUser.id} readOnly />
									</span>

									<span id="email">
										Email : <input value={currentUser.email} readOnly />
									</span>

									<span>
										Gender : <input value={currentUser.gender} readOnly />
									</span>

									<span>
										Department : &nbsp;
										<input value={currentUser.department} readOnly />
									</span>

									<span>
										Semester : <input value={currentUser.semester} readOnly />
									</span>

									{editT && (
										<span id="current-p">
											<label htmlFor="currPassword">Current Password :</label>

											<input
												type="password"
												name="current_p"
												id="currPassword"
												autoFocus
												onChange={(event) => setCpassword(event.target.value)}
											/>
										</span>
									)}

									{currentUser.role === "advisor" && (
										<span id={editT ? "phone-number" : ""}>
											<label htmlFor="phone">
												Phone : &nbsp; {editT && <h6>+880</h6>}
											</label>

											<input
												type={editT ? "number" : "text"}
												name="phone"
												id="phone"
												value={displayValue()}
												readOnly={editT ? false : true}
												onChange={(event) => setPhone(event.target.value)}
											/>
										</span>
									)}

									{currentUser.role === "student" && (
										<span id="year">
											Academic Year :&nbsp;
											<input value={currentUser.year} readOnly />
										</span>
									)}

									{editT && (
										<div className="last-field">
											<span id="new-p">
												<label htmlFor="newPassword">New Password :</label>

												<input
													type="password"
													name="new_p"
													id="newPassword"
													onChange={(event) =>
														setNewPassword(event.target.value)
													}
												/>
											</span>
											<div className="profile-btn">
												<button
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
					onChange={imgHandler}
					style={{ display: "none" }}
				/>
				{changeProfileT && (
					<CngProfileImg
						setChangeProfileT={setChangeProfileT}
						previewImg={previewImg}
						getFile={getFile}
					/>
				)}
			</div>
		</>
	);
};

export default ProfileEdit;
