// external components
import { toast } from "react-toastify";

// internal components
import { useEffect, useRef, useState } from "react";
import { GetContextApi } from "../../../../../ContextApi";
import "./Header.css";

const Header = ({ getMessages, setReloadGroup }) => {
	// get current user
	const { currentUser } = GetContextApi();

	// for dropdown
	const [dropdownT, setDropdownT] = useState("");

	// for get selected
	const [viewGroup, setViewGroup] = useState("");
	const [viewAttach, setViewAttach] = useState("");

	// for edit toggle
	const [groupEdit, setGroupEdit] = useState("");

	// for group-image get & preview
	const [getFile, setFile] = useState("");
	const [previewImg, setPreviewImg] = useState(
		getMessages.room ===
			`${currentUser?.department}-${currentUser?.semester}-${currentUser?.year}` &&
			`/uploads/profile-img/${getMessages.group_img}`
	);

	// for get group-name
	const [groupName, setGroupName] = useState(
		getMessages.room ===
			`${currentUser?.department}-${currentUser?.semester}-${currentUser?.year}` &&
			getMessages.group_name
	);

	// for close header dropdown from outside-click start
	const dropdownRef = useRef();

	const handleClickOutside = (e) => {
		if (!dropdownRef.current?.contains(e.target)) {
			setDropdownT(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// for close header dropdown from outside-click end

	// for close header dropdown from outside-click start
	const viewRef = useRef();

	const handleClickOutsideView = (e) => {
		if (!viewRef.current?.contains(e.target)) {
			setViewGroup(false);
			setViewAttach(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutsideView);
		return () =>
			document.removeEventListener("mousedown", handleClickOutsideView);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// for close header dropdown from outside-click end

	// for preview group-chat image start
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
	// for preview group-chat image end

	// for submit group-img or group-name start
	const editGroupSumit = async (event) => {
		event.preventDefault();

		if (getFile || groupName) {
			const formData = new FormData();
			formData.append("_id", getMessages._id);
			formData.append("group_name", groupName);
			formData.append("file", getFile);

			try {
				const response = await fetch("/group-chat/update", {
					method: "PUT",
					body: formData
				});

				const result = await response.json();

				if (response.status === 200) {
					toast.success(result.message, {
						position: "top-right",
						theme: "colored",
						autoClose: 1500
					});
					setTimeout(() => {
						setReloadGroup(Date.now());
						setGroupEdit(false);
					}, 2000);
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
		}
	};
	// for submit group-img or group-name end

	return (
		<>
			<div className="header-container">
				<div className="selected-user">
					{/* header img start  */}
					{getMessages.room ===
					`${currentUser?.department}-${currentUser?.semester}-${currentUser?.year}` ? (
						<img src={previewImg} alt="profile-img" className="img-fluid" />
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
						<h6>{groupName}</h6>
					) : currentUser.role === "advisor" ? (
						<h6>{getMessages.student.name}</h6>
					) : (
						<h6>{getMessages.advisor.name}</h6>
					)}
					{/* header name end  */}
				</div>

				<span className="header-dropdown">
					<i
						className="fa-solid fa-ellipsis"
						id="three-dot"
						onClick={() => setDropdownT(!dropdownT)}
					></i>

					{dropdownT && (
						<ul ref={dropdownRef} data-aos="fade-left">
							{currentUser?.role !== "student" &&
								getMessages.room ===
									`${currentUser?.department}-${currentUser?.semester}-${currentUser?.year}` && (
									<li
										onClick={() => {
											setViewGroup("group");
											setDropdownT(false);
										}}
									>
										<i className="fa-solid fa-user-group"></i>
										<span>Group Details</span>
									</li>
								)}

							<li
								onClick={() => {
									setViewAttach("attachment");
									setDropdownT(false);
								}}
							>
								<i className="fa-solid fa-paperclip"></i>
								<span>All Attachments</span>
							</li>
						</ul>
					)}
				</span>
				{(viewAttach || viewGroup) && (
					<div
						className="view-container"
						data-aos="fade-left"
						data-aos-duration="1000"
						ref={viewRef}
					>
						{/* view group start  */}
						{viewGroup && (
							<div className="view-group-container">
								<div className="group-info">
									<span className="img-wrapper">
										<img
											src={previewImg}
											alt="profile-img"
											className={
												groupEdit ? "img-fluid" : "img-fluid animation"
											}
										/>

										{groupEdit && (
											<span className="change-img">
												<label htmlFor="change-img">
													<i className="fa-solid fa-camera"></i>
												</label>
											</span>
										)}
									</span>

									<span id="group-name">
										<input
											value={groupName}
											readOnly={groupEdit ? false : true}
											id={groupEdit ? "active" : ""}
											onChange={(e) => setGroupName(e.target.value)}
										/>

										{groupEdit && (
											<div className="group-edit-btn">
												<button
													className="btn btn-danger"
													onClick={() => {
														setGroupEdit(false);
														setPreviewImg(
															getMessages.room ===
																`${currentUser?.department}-${currentUser?.semester}-${currentUser?.year}` &&
																`/uploads/profile-img/${getMessages.group_img}`
														);
													}}
												>
													Cancel
												</button>
												<button
													className="btn btn-success"
													onClick={editGroupSumit}
												>
													Submit
												</button>
											</div>
										)}
									</span>
								</div>

								<div className="display-members"></div>
							</div>
						)}
						{/* view group end  */}
						{/* view attachment start  */}
						{viewAttach && (
							<div className="view-attachment-container">view attach</div>
						)}
						{/* view attachment end  */}
						{/* for close icon start  */}
						<div className="icon">
							<span onClick={() => setGroupEdit(!groupEdit)}>
								<i className="fa-solid fa-pen-to-square"></i>
							</span>

							<span
								onClick={() => {
									setViewGroup(false);
									setViewAttach(false);
								}}
							>
								<i className="fa-solid fa-circle-xmark"></i>
							</span>
						</div>
						{/* for close icon end  */}

						{/* input-field for get file start  */}
						<input
							type="file"
							name="profile-img"
							id="change-img"
							accept="image/png, image/gif, image/jpeg"
							onChange={imgHandler}
							style={{ display: "none" }}
						/>
						{/* input-field for get file end  */}
					</div>
				)}
			</div>
		</>
	);
};

export default Header;
