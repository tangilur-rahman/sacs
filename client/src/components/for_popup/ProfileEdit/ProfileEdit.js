// external components
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "../../../ContextApi";
import CngProfileImg from "./CngProfileImg/CngProfileImg";
import "./ProfileEdit.css";

// dropdown components
import DepartDropdown from "./Dropdown/DepartDropdown/DepartDropdown";
import GenderDropdown from "./Dropdown/GenderDropdown/GenderDropdown";
import RoleDropdown from "./Dropdown/RoleDropdown/RoleDropdown";
import SemesterDropDown from "./Dropdown/SemesterDropdown/SemesterDropdown";
import YearDropdown from "./Dropdown/YearDropdown/YearDropdown";

const ProfileEdit = ({
	setProfileT,
	currentUser,
	userEdit,
	setUserEdit,
	setCreated
}) => {
	// for updating homepage
	const { setIsSubmitted } = GetContextApi();

	// for toggle edit option
	const [editT, setEditT] = useState(false);
	const [changeProfileT, setChangeProfileT] = useState(false);

	// get all input field values & change
	const [getName, setName] = useState(userEdit.name);
	const [getId, setId] = useState(userEdit.id);
	const [getEmail, setEmail] = useState(userEdit.email);
	const [getGender, setGender] = useState(userEdit.gender);
	const [getRole, setRole] = useState(userEdit.role);
	const [getDepart, setDepart] = useState(userEdit.department);
	const [getSemester, setSemester] = useState(userEdit.semester);
	const [getYear, setYear] = useState(userEdit.year);

	// for file handle
	const [getFile, setFile] = useState("");
	const [previewImg, setPreviewImg] = useState(
		userEdit
			? `uploads/profile-img/${userEdit.profile_img}`
			: `uploads/profile-img/${currentUser.profile_img}`
	);

	// for get input-field's value
	const [cpassword, setCpassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [getPhone, setPhone] = useState("");

	// conform popup for delete
	const [conformPopup, setConformPopup] = useState("");

	// for close when clicked outside start
	const myRef = useRef();

	const handleClickOutside = (e) => {
		if (!myRef.current?.contains(e.target)) {
			setUserEdit(false);
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

	// submit handler start
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
	// submit handler end

	// for displaying phone-number start
	const displayValue = (user) => {
		if (editT) {
			return getPhone;
		} else if (user.phone) {
			return "+88 " + user.phone;
		} else {
			return "null";
		}
	};
	// for displaying phone-number end

	// for admin submit handler start
	const submitHandlerAdmin = async () => {
		if (
			!(
				(getName === userEdit.name ? "" : getName) ||
				(getId === userEdit.id ? "" : getId) ||
				(getDepart === userEdit.department ? "" : getDepart) ||
				(getEmail === userEdit.email ? "" : getEmail) ||
				(getGender === userEdit.gender ? "" : getGender) ||
				(getRole === userEdit.role ? "" : getRole) ||
				(getYear === userEdit.year ? "" : getYear) ||
				(getSemester === userEdit.semester ? "" : getSemester) ||
				newPassword
			)
		) {
			toast("Noting have to submit", {
				position: "top-right",
				theme: "dark",
				autoClose: 3000
			});
			return;
		} else {
			try {
				const userDocument = {
					_id: userEdit._id,
					getName: getName === userEdit.name ? "" : getName,
					getId: getId === userEdit.id ? "" : getId,
					getDepart: getDepart === userEdit.department ? "" : getDepart,
					getEmail: getEmail === userEdit.email ? "" : getEmail,
					getGender: getGender === userEdit.gender ? "" : getGender,
					getRole: getRole === userEdit.role ? "" : getRole,
					getYear: getYear === userEdit.year ? "" : getYear,
					getSemester: getSemester === userEdit.semester ? "" : getSemester,
					newPassword
				};

				if (userEdit.role === "advisor") {
					const response = await fetch("/user/advisor-update", {
						method: "PUT",
						body: JSON.stringify({
							userDocument
						}),
						headers: { "Content-Type": "application/json" }
					});

					const result = await response.json();

					if (response.status === 200) {
						setEditT(false);
						toast.success(result.message, {
							position: "top-right",
							theme: "colored",
							autoClose: 3000
						});
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
				} else if (userEdit.role === "student") {
					const response = await fetch("/user/student-update", {
						method: "PUT",
						body: JSON.stringify({ userDocument }),
						headers: { "Content-Type": "application/json" }
					});

					const result = await response.json();

					if (response.status === 200) {
						setEditT(false);
						toast.success(result.message, {
							position: "top-right",
							theme: "colored",
							autoClose: 3000
						});
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
				}
			} catch (error) {
				toast.error(error.message, {
					position: "top-right",
					theme: "colored",
					autoClose: 3000
				});
			}
		}
	};
	// for admin submit handler end

	// user delete handler start
	const userDeleteHandler = async () => {
		if (userEdit.role === "advisor") {
			try {
				const response = await fetch(`/user/advisor/delete/${userEdit._id}`);

				const result = await response.json();

				if (response.status === 200) {
					setCreated(Date.now());
					setConformPopup(false);

					toast.success(result.message, {
						position: "top-right",
						theme: "colored",
						autoClose: 1500
					});
					setTimeout(() => {
						setUserEdit(false);
					}, 2500);
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
		} else if (userEdit.role === "student") {
			try {
				const response = await fetch(`/user/student/delete/${userEdit._id}`);

				const result = await response.json();

				if (response.status === 200) {
					setCreated(Date.now());
					setConformPopup(false);
					toast.success(result.message, {
						position: "top-right",
						theme: "colored",
						autoClose: 1500
					});
					setTimeout(() => {
						setUserEdit(false);
					}, 2500);
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
		}
	};
	// user delete handler end

	return (
		<>
			<div
				className="profile-edit-container"
				data-aos="fade-up"
				data-aos-delay="0"
			>
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
										src={
											userEdit
												? `uploads/profile-img/${userEdit.profile_img}`
												: `uploads/profile-img/${currentUser.profile_img}`
										}
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
										Name :&nbsp;
										<input
											value={userEdit ? getName : currentUser.name}
											readOnly={userEdit && editT ? false : true}
											onChange={(event) => setName(event.target.value)}
										/>
									</span>

									<span>
										ID :&nbsp;
										<input
											type="number"
											value={userEdit ? getId : currentUser.id}
											readOnly={userEdit && editT ? false : true}
											onChange={(event) => setId(event.target.value)}
										/>
									</span>

									<span id="email">
										Email :&nbsp;
										<input
											type="email"
											value={userEdit ? getEmail : currentUser.email}
											readOnly={userEdit && editT ? false : true}
											onChange={(event) => setEmail(event.target.value)}
										/>
									</span>

									{userEdit ? (
										<span className={userEdit ? "remove-pd" : ""}>
											<GenderDropdown
												getGender={getGender}
												setGender={setGender}
												editT={editT}
											/>
										</span>
									) : (
										<span>
											Gender :&nbsp;
											<input value={currentUser.gender} readOnly />
										</span>
									)}

									{userEdit ? (
										<span className={userEdit ? "remove-pd" : ""}>
											<DepartDropdown
												getDepart={getDepart}
												setDepart={setDepart}
												editT={editT}
											/>
										</span>
									) : (
										currentUser?.role !== "administrator" && (
											<span>
												Department : &nbsp;
												<input value={currentUser.department} readOnly />
											</span>
										)
									)}

									{userEdit ? (
										<span className={userEdit ? "remove-pd" : ""}>
											<SemesterDropDown
												getSemester={getSemester}
												setSemester={setSemester}
												editT={editT}
											/>
										</span>
									) : (
										currentUser?.role !== "administrator" && (
											<span>
												Semester :&nbsp;
												<input value={currentUser.semester} readOnly />
											</span>
										)
									)}

									{userEdit && (
										<span className={userEdit ? "remove-pd" : ""}>
											<RoleDropdown
												getRole={getRole}
												setRole={setRole}
												editT={editT}
											/>
										</span>
									)}

									{!userEdit && editT && (
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

									{!userEdit && currentUser.role === "administrator" && (
										<span>
											Last Updated :&nbsp;
											<input
												value={moment(currentUser.updatedAt).format(
													"h:mm A - MMMM DD, YYYY"
												)}
												readOnly
											/>
										</span>
									)}

									{!userEdit && currentUser.role === "advisor" && (
										<span id={editT ? "phone-number" : ""}>
											<label htmlFor="phone">
												Phone : &nbsp; {editT && <h6>+880</h6>}
											</label>

											<input
												type={editT ? "number" : "text"}
												name="phone"
												id="phone"
												value={displayValue(currentUser)}
												readOnly={editT ? false : true}
												onChange={(event) => setPhone(event.target.value)}
											/>
										</span>
									)}

									{userEdit && userEdit.role !== "administrator" ? (
										<span className={userEdit ? "remove-pd" : ""} id="for-year">
											<YearDropdown
												getYear={getYear}
												setYear={setYear}
												editT={editT}
											/>
										</span>
									) : (
										currentUser.role === "student" && (
											<span id="year">
												Academic Year :&nbsp;
												<input value={currentUser.year} readOnly />
											</span>
										)
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
												{userEdit ? (
													<button
														className="btn btn-success"
														onClick={submitHandlerAdmin}
													>
														Submit
													</button>
												) : (
													<button
														className="btn btn-success"
														onClick={submitHandler}
													>
														Submit
													</button>
												)}
											</div>
										</div>
									)}
								</div>
							</div>

							<div className="icon">
								<span
									onClick={() => setConformPopup(!conformPopup)}
									id={userEdit ? "" : "when-not-admin"}
								>
									<i className="fa-solid fa-trash-can"></i>
								</span>

								<span onClick={() => setEditT(!editT)}>
									<i className="fa-solid fa-user-pen"></i>
								</span>

								<span
									onClick={() => {
										setProfileT(false);
										setUserEdit(false);
									}}
								>
									<i className="fa-solid fa-circle-xmark"></i>
								</span>
							</div>

							{/* for popup model section start  */}
							{conformPopup && (
								<div
									className="conformation-popup"
									data-aos="fade-down"
									data-aos-delay="0"
								>
									<h5>Do you want to delete that appointment?</h5>
									<div className="delete-controller">
										<button
											className="btn btn-dark"
											onClick={() => {
												setConformPopup(!conformPopup);
											}}
										>
											Cancel
										</button>

										<button
											className="btn btn-danger"
											onClick={userDeleteHandler}
										>
											Submit
										</button>
									</div>
								</div>
							)}
							{/* for popup model section end  */}
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
						userEdit={userEdit}
						setUserEdit={setUserEdit}
					/>
				)}
			</div>
		</>
	);
};

export default ProfileEdit;
