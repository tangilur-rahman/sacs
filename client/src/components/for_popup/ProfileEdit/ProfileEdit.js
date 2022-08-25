// external components
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

// internal components
import { GetContextApi } from "../../../ContextApi";
import CngProfileImg from "./CngProfileImg/CngProfileImg";
import "./ProfileEdit.css";

// dropdown components
import AdvisorDropdown from "./Dropdown/AdvisorDropdown/AdvisorDropdown";
import DepartDropdown from "./Dropdown/DepartDropdown/DepartDropdown";
import GenderDropdown from "./Dropdown/GenderDropdown/GenderDropdown";
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
	const [getDepart, setDepart] = useState(userEdit.department);
	const [getSemester, setSemester] = useState(
		userEdit.role === "student" && userEdit.semester
	);
	const [getMin, setMin] = useState(
		userEdit.role === "advisor" && userEdit.minRange
	);
	const [getMax, setMax] = useState(
		userEdit.role === "advisor" && userEdit.maxRange
	);
	const [getYear, setYear] = useState(
		userEdit.role === "student" && userEdit.year
	);
	const [getAdvisor, setAdvisor] = useState(
		userEdit.role === "student" && userEdit.advisor
	);

	const [getAdvisorArray, setAdvisorArray] = useState("");

	// for get total students from advisors
	const [getTotalS, setTotalS] = useState("");

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

	// for toggle password type
	const [typeC_P_T, setTypeC_P_T] = useState(false);
	// for toggle password type
	const [typeN_P_T, setTypeN_P_T] = useState(false);

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

	// get total students for advisor start
	useEffect(() => {
		if (currentUser.role === "advisor" || userEdit.role === "advisor") {
			(async () => {
				const _id = userEdit ? userEdit._id : currentUser._id;

				try {
					const response = await fetch(`/user/total-students/${_id}`);

					const result = await response.json();

					if (response.status === 200) {
						setTotalS(result);
					} else if (result.error) {
						toast(result.error, {
							position: "top-right",
							theme: "dark",
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
			})();
		}
	}, [currentUser, userEdit]);
	// get total students for advisor end

	// for displaying phone-number start
	const displayValue = (user) => {
		if (editT) {
			return getPhone;
		} else if (user.phone) {
			return "+88 " + user.phone;
		} else {
			return "Null";
		}
	};
	// for displaying phone-number end

	// for admin submit handler start
	const submitHandlerAdmin = async () => {
		if (
			!(
				(getName === userEdit?.name ? "" : getName) ||
				(getId === userEdit?.id ? "" : getId) ||
				(getDepart === userEdit?.department ? "" : getDepart) ||
				(getEmail === userEdit?.email ? "" : getEmail) ||
				(getGender === userEdit?.gender ? "" : getGender) ||
				(getMin === userEdit?.minRange ? "" : getMin) ||
				(getMax === userEdit?.maxRange ? "" : getMax) ||
				((getYear && getYear.getFullYear()) === userEdit?.year
					? ""
					: getYear && getYear.getFullYear()) ||
				(getSemester === userEdit?.semester ? "" : getSemester) ||
				(getPhone === userEdit?.phone ? "" : getPhone) ||
				(getAdvisor._id === userEdit?.advisor?._id ? "" : getAdvisor._id) ||
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
					department: userEdit.department,
					getName: getName === userEdit?.name ? "" : getName,
					getId: getId === userEdit?.id ? "" : getId,
					getDepart: getDepart === userEdit?.department ? "" : getDepart,
					getEmail: getEmail === userEdit?.email ? "" : getEmail,
					getGender: getGender === userEdit?.gender ? "" : getGender,
					getMin: getMin === userEdit?.minRange ? "" : getMin,
					getMax: getMax === userEdit?.maxRange ? "" : getMax,
					getYear:
						(getYear && getYear.getFullYear()) === userEdit?.year
							? ""
							: getYear && getYear.getFullYear(),
					getSemester: getSemester === userEdit?.semester ? "" : getSemester,
					getPhone: getPhone === userEdit?.phone ? "" : getPhone,
					getAdvisor:
						getAdvisor._id === userEdit?.advisor?._id ? "" : getAdvisor._id,
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

	// get department wise advisors for student start
	useEffect(() => {
		if (userEdit.role === "student") {
			(async () => {
				try {
					const response = await fetch(
						`/user/advisors/${getAdvisor.department}`
					);
					const result = await response.json();

					if (response.status === 200) {
						setAdvisorArray(result ? result : []);
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
			})();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userEdit]);
	// get department wise advisors for student end

	return (
		<>
			<div
				className="profile-edit-container"
				data-aos="fade-up"
				data-aos-delay="0"
			>
				<div className="row m-0 layout">
					<div className="col-xl-9 col-lg-10 col-11 p-0">
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
								<div className="row info m-0">
									<span className={userEdit && editT ? "outline-style" : ""}>
										Name :&nbsp;
										<input
											value={userEdit ? getName : currentUser.name}
											readOnly={userEdit && editT ? false : true}
											onChange={(event) => setName(event.target.value)}
											style={{ maxWidth: "200px" }}
										/>
									</span>

									<span className={userEdit && editT ? "outline-style" : ""}>
										ID :&nbsp;
										<input
											type="number"
											value={userEdit ? getId : currentUser.id}
											readOnly={userEdit && editT ? false : true}
											onChange={(event) => setId(event.target.value)}
											style={{ maxWidth: "180px" }}
										/>
									</span>

									<span
										id="email"
										className={userEdit && editT ? "outline-style" : ""}
									>
										Email :&nbsp;
										<input
											type="email"
											value={userEdit ? getEmail : currentUser.email}
											readOnly={userEdit && editT ? false : true}
											onChange={(event) => setEmail(event.target.value)}
										/>
									</span>

									{userEdit ? (
										<span
											className={userEdit ? "remove-pd" : ""}
											id={userEdit && editT ? "outline-style" : ""}
										>
											<p className={editT ? "input-text-hide" : "input-text"}>
												{editT ? "" : "Gender :"}
											</p>

											<GenderDropdown
												getGender={getGender}
												setGender={setGender}
												editT={editT}
											/>
										</span>
									) : (
										<span>
											Gender :&nbsp;
											<input
												value={currentUser.gender}
												readOnly
												style={{ maxWidth: "160px" }}
											/>
										</span>
									)}

									{userEdit ? (
										<span
											className={
												userEdit ? "remove-pd department" : "department"
											}
											id={userEdit && editT ? "outline-style" : ""}
										>
											<p className={editT ? "input-text-hide" : "input-text"}>
												{editT ? "" : "Department :"}
											</p>
											<DepartDropdown
												getDepart={getDepart}
												setDepart={setDepart}
												editT={editT}
											/>
										</span>
									) : (
										currentUser?.role !== "administrator" && (
											<span className="department">
												Department : &nbsp;
												<input
													value={currentUser.department.toUpperCase()}
													readOnly
												/>
											</span>
										)
									)}

									{(userEdit.role === "advisor" ||
										currentUser.role === "advisor") && (
										<span id="total-students">
											Total &nbsp;
											{getTotalS && getTotalS > 1 ? "students" : "student"}
											&nbsp;:&nbsp;
											<input
												value={getTotalS ? getTotalS : "Null"}
												readOnly
												style={{ width: "fit-content" }}
											/>
										</span>
									)}

									{userEdit.role === "student" ? (
										<span
											className={userEdit ? "remove-pd" : ""}
											id={userEdit && editT ? "outline-style" : ""}
										>
											<p className={editT ? "input-text-hide" : "input-text"}>
												{editT ? "" : "Semester :"}
											</p>
											<SemesterDropDown
												getSemester={getSemester}
												setSemester={setSemester}
												editT={editT}
											/>
										</span>
									) : (
										currentUser?.role === "student" && (
											<span>
												Semester :&nbsp;
												<input
													value={currentUser.semester}
													readOnly
													style={{ maxWidth: "190px" }}
												/>
											</span>
										)
									)}

									{userEdit.role === "advisor" && (
										<span
											className={userEdit ? "remove-pd" : ""}
											id={userEdit && editT ? "outline-style" : ""}
										>
											{editT ? (
												<div
													className="range-container"
													title="Student Id Range"
												>
													<h6>Range&nbsp;:</h6>
													<div className="range-fields">
														<input
															type="number"
															placeholder="id"
															value={getMin}
															onChange={(event) => setMin(event.target.value)}
														/>
														-
														<input
															type="number"
															placeholder="id"
															value={getMax}
															onChange={(event) => setMax(event.target.value)}
														/>
													</div>
												</div>
											) : (
												<>
													<p
														className={editT ? "input-text-hide" : "input-text"}
													>
														{editT ? "" : "Id Range :"}
													</p>
													&nbsp;
													<input
														value={
															userEdit.minRange + " - " + userEdit.maxRange
														}
														readOnly
														style={{ maxWidth: "190px" }}
													/>
												</>
											)}
										</span>
									)}

									{!userEdit && editT && (
										<span id="current-p" className="password-field">
											<label htmlFor="currPassword">Current Pass..:</label>

											<input
												type={typeC_P_T ? "text" : "password"}
												name="current_p"
												id="currPassword"
												value={cpassword}
												onChange={(event) => setCpassword(event.target.value)}
											/>

											{/* for type toggle start  */}
											{cpassword && (
												<div id="eye">
													{typeC_P_T ? (
														<i
															className="fa-solid fa-eye"
															onClick={() => setTypeC_P_T(!typeC_P_T)}
															style={{ color: "#6930c3" }}
														></i>
													) : (
														<i
															className="fa-solid fa-eye-slash"
															onClick={() => setTypeC_P_T(!typeC_P_T)}
														></i>
													)}
												</div>
											)}

											{/* for type toggle end  */}
										</span>
									)}

									{!userEdit && currentUser.role === "administrator" && (
										<span title="last-updated">
											Updated:&nbsp;
											<input
												value={moment(currentUser.updatedAt).format(
													"h:mm A - MMM DD, YYYY"
												)}
												readOnly
											/>
										</span>
									)}

									{(userEdit.role === "advisor" ||
										currentUser.role === "advisor") && (
										<span id={editT ? "phone-number" : ""}>
											<label htmlFor="phone">
												Phone : &nbsp; {editT && <h6>+88</h6>}
											</label>

											<form style={{ display: "inline-block" }}>
												<input
													type={editT ? "number" : "text"}
													name="phone"
													id="phone"
													autoComplete="off"
													value={displayValue(
														userEdit ? userEdit : currentUser
													)}
													readOnly={editT ? false : true}
													onChange={(event) => setPhone(event.target.value)}
												/>
											</form>
										</span>
									)}

									{userEdit.role === "student" ? (
										<span
											className={userEdit ? "remove-pd" : ""}
											id={userEdit && editT ? "outline-style" : ""}
										>
											<p className="input-text">Academic Year :</p>
											<YearDropdown
												getYear={getYear}
												setYear={setYear}
												editT={editT}
											/>
										</span>
									) : (
										currentUser.role === "student" && (
											<span>
												Academic Year :&nbsp;
												<input
													value={currentUser.year}
													readOnly
													style={{ maxWidth: "100px" }}
												/>
											</span>
										)
									)}

									{userEdit.role === "student" && (
										<span
											className={userEdit ? "remove-pd" : ""}
											id={userEdit && editT ? "outline-style" : ""}
										>
											<p className={editT ? "input-text-hide" : "input-text"}>
												{editT ? "" : "Advisor :"}
											</p>
											<AdvisorDropdown
												getAdvisor={getAdvisor}
												setAdvisor={setAdvisor}
												getAdvisorArray={getAdvisorArray}
												editT={editT}
											/>
										</span>
									)}

									{editT && (
										<>
											<span
												className="password-field new-password-field"
												id="outline-style"
											>
												<label htmlFor="newPassword">New Pass..:</label>

												<input
													type={typeN_P_T ? "text" : "password"}
													name="new_p"
													id="newPassword"
													onChange={(event) =>
														setNewPassword(event.target.value)
													}
													value={newPassword}
													style={{
														maxWidth: "175px"
													}}
												/>

												{/* for type toggle start  */}
												{newPassword && (
													<div id="eye">
														{typeN_P_T ? (
															<i
																className="fa-solid fa-eye"
																onClick={() => setTypeN_P_T(!typeN_P_T)}
																style={{ color: "#6930c3" }}
															></i>
														) : (
															<i
																className="fa-solid fa-eye-slash"
																onClick={() => setTypeN_P_T(!typeN_P_T)}
															></i>
														)}
													</div>
												)}

												{/* for type toggle end  */}
											</span>

											<span className="profile-btn">
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
											</span>
										</>
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
											Delete
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
