// external components
import { toast } from "react-toastify";
import sortArray from "sort-array";

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
	const [previewImg, setPreviewImg] = useState("");

	// for get group-name
	const [groupName, setGroupName] = useState("");

	// for get all members
	const [getAllMembers, setAllMembers] = useState("");

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

		if (getFile || (groupName !== getMessages.group_name && groupName)) {
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
		} else {
			toast("Nothing change for update", {
				position: "top-right",
				theme: "dark",
				autoClose: 3000
			});
		}
	};
	// for submit group-img or group-name end

	// get all group members start
	useEffect(() => {
		if (currentUser) {
			// get group name & image
			if (currentUser.role === "advisor") {
				setGroupName(
					getMessages.room === currentUser._id && getMessages.group_name
				);

				setPreviewImg(
					getMessages.room === currentUser._id
						? `/uploads/profile-img/${getMessages?.group_img}`
						: ""
				);
			} else if (currentUser.role === "student") {
				setGroupName(
					getMessages.room === currentUser.advisor._id && getMessages.group_name
				);

				setPreviewImg(
					getMessages.room === currentUser.advisor._id
						? `/uploads/profile-img/${getMessages?.group_img}`
						: ""
				);
			}

			// get all group members

			(async () => {
				try {
					let room;
					if (currentUser.role === "advisor") {
						room = currentUser._id;
					} else if (currentUser.role === "student") {
						room = currentUser.advisor._id;
					}

					const response = await fetch(`/group-chat/members/${room}`);

					const result = await response.json();

					if (response.status === 200) {
						setAllMembers(result);
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
	}, [currentUser, getMessages]);
	// get all group members end

	// for attachment img view start
	const fileViewHandler = (file) => {
		const fileName = file;
		const extension = file.split(".").pop();

		if (extension === "png" || extension === "jpg" || extension === "jpeg ") {
			return (
				<img
					src={`uploads/attachments/${fileName}`}
					alt="attachment-img"
					className="img-fluid cover"
				/>
			);
		} else if (extension === "mp3") {
			return (
				<div className="audio-container">
					<img
						src="/assets/images/wave.gif"
						alt="audio wave"
						type="image/gif"
						className="img-fluid"
					/>
					<audio controls>
						<source src={`uploads/attachments/${fileName}`} type="audio/mp3" />
					</audio>
				</div>
			);
		} else if (extension === "mp4" || extension === "mkv") {
			return (
				<video controls muted autoPlay>
					<source src={`uploads/attachments/${fileName}`} type="video/mp4" />
					<source src={`uploads/attachments/${fileName}`} type="video/mkv" />
				</video>
			);
		} else if (extension === "pdf") {
			return (
				<img
					src={`/assets/images/pdf.png`}
					alt="attachment-img"
					className="img-fluid"
				/>
			);
		} else if (extension === "doc" || extension === "docx") {
			return (
				<img
					src={`/assets/images/doc.png`}
					alt="attachment-img"
					className="img-fluid"
				/>
			);
		} else if (extension === "xlsx" || extension === "xls") {
			return (
				<img
					src={`/assets/images/xls.png`}
					alt="attachment-img"
					className="img-fluid"
				/>
			);
		} else if (extension === "pptx" || extension === "ppt") {
			return (
				<img
					src={`/assets/images/ppt.png`}
					alt="attachment-img"
					className="img-fluid"
				/>
			);
		}
	};
	// for attachment img view end

	return (
		<>
			<div className="header-container">
				<div className="selected-user">
					{/* header img start  */}
					{(currentUser.role === "advisor" &&
						getMessages.room === currentUser._id) ||
					(currentUser.role === "student" &&
						getMessages.room === currentUser.advisor._id) ? (
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
					{(currentUser.role === "advisor" &&
						getMessages.room === currentUser._id) ||
					(currentUser.role === "student" &&
						getMessages.room === currentUser.advisor._id) ? (
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
								((currentUser.role === "advisor" &&
									getMessages.room === currentUser._id) ||
									(currentUser.role === "student" &&
										getMessages.room === currentUser.advisor._id)) && (
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
															((currentUser.role === "advisor" &&
																getMessages.room === currentUser._id) ||
																(currentUser.role === "student" &&
																	getMessages.room ===
																		currentUser.advisor._id)) &&
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

								<div className="display-members">
									{getAllMembers?.length > 0 ? (
										sortArray(getAllMembers, {
											by: "updatedAt",
											order: "desc"
										}).map((value, index) => {
											return (
												<div className="member" key={index}>
													<img
														src={`/uploads/profile-img/${value.profile_img}`}
														alt="group-member"
													/>
													<h6>{value.name}</h6>
												</div>
											);
										})
									) : (
										<h6 style={{ color: "red" }}>Empty Member.</h6>
									)}
								</div>
							</div>
						)}
						{/* view group end  */}

						{/* view attachment start  */}
						{viewAttach && (
							<div className="view-attachment-container">
								{getMessages.attachments.length > 0 ? (
									sortArray(getMessages.attachments, {
										by: "time",
										order: "desc"
									}).map((value, index) => {
										return (
											<div className="attachment" key={index}>
												{fileViewHandler(value.attachment)}

												<a
													href={`uploads/attachments/${value.attachment}`}
													download
												>
													{value.attachment.split(/[-]/).slice(0, 1, -1) +
														"." +
														value.attachment.split(".").slice(-1)[0]}
												</a>
											</div>
										);
									})
								) : (
									<div className="empty-attachment">
										<img
											src="/assets/images/no-attachment.png"
											alt="empty-attach-img"
											className="img-fluid"
										/>
										<p>No Attachment.</p>
									</div>
								)}
							</div>
						)}
						{/* view attachment end  */}

						{/* for close icon start  */}
						<div className="icon">
							<span
								onClick={() => setGroupEdit(!groupEdit)}
								id={viewAttach ? "not-display" : ""}
							>
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
